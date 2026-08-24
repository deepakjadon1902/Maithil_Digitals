import { BarChart3, Eye, EyeOff, FileText, ImageUp, LayoutDashboard, Lock, LogOut, Plus, Save, Search, Settings, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";
import { Button } from "../components/Button";
import { adminApi } from "../services/adminApi";

export function ControlPanel() {
  const [session, setSession] = useState<"checking" | "guest" | "admin">("checking");
  const [active, setActive] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    adminApi.me().then(() => setSession("admin")).catch(() => setSession("guest"));
  }, []);

  useEffect(() => {
    if (session === "guest" && location.pathname !== "/admin/login") {
      navigate("/admin/login", { replace: true });
    }

    if (session === "admin" && location.pathname === "/admin/login") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [location.pathname, navigate, session]);

  if (session === "checking") {
    return <AdminShell><p className="text-muted">Checking secure session...</p></AdminShell>;
  }

  if (session === "guest") {
    return <AdminLogin onSuccess={() => {
      setSession("admin");
      navigate("/admin/dashboard", { replace: true });
    }} />;
  }

  return (
    <>
      <SEO seo={{ title: "Admin Dashboard | Maithil Digitals", description: "Administration dashboard for Maithil Digitals.", robots: "noindex,nofollow" }} />
      <div className="min-h-screen bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-premium border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-6 flex items-center gap-3 px-2">
              <Lock className="text-orange" size={22} />
              <strong>Control Panel</strong>
            </div>
            <nav className="grid gap-1">
              {adminNav.map((item) => (
                <button key={item.key} onClick={() => setActive(item.key)} className={`flex items-center gap-3 rounded-premium px-3 py-3 text-left text-sm font-bold transition ${active === item.key ? "bg-orange text-white" : "text-muted hover:bg-white/5 hover:text-white"}`}>
                  <item.icon size={17} /> {item.label}
                </button>
              ))}
              <button onClick={() => adminApi.logout().finally(() => setSession("guest"))} className="mt-3 flex items-center gap-3 rounded-premium px-3 py-3 text-left text-sm font-bold text-muted hover:bg-white/5 hover:text-white"><LogOut size={17} /> Logout</button>
            </nav>
          </aside>
          <section className="min-w-0 rounded-premium border border-white/10 bg-white/[0.04] p-5 md:p-8">
            {active === "dashboard" ? <Dashboard /> : null}
            {active === "settings" ? <SingletonEditor resource="settings" title="Website Settings" /> : null}
            {active === "home" ? <SingletonEditor resource="home" title="Home Page" /> : null}
            {active === "about" ? <SingletonEditor resource="about" title="About Page" /> : null}
            {active === "seo" ? <SingletonEditor resource="seo" title="SEO Settings" /> : null}
            {resourceMap[active] ? <ResourceManager {...resourceMap[active]} /> : null}
            {active === "media" ? <MediaManager /> : null}
            {active === "account" ? <AccountPanel onLogout={() => setSession("guest")} /> : null}
          </section>
        </div>
      </div>
    </>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("maithildigitals@gmail.com");
  const [password, setPassword] = useState("maithildigitals@108");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("Signing in...");
    try {
      await adminApi.login({ email, password });
      onSuccess();
    } catch {
      setStatus("Invalid credentials or server unavailable.");
    }
  }
  return (
    <AdminShell>
      <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-premium border border-white/10 bg-white/[0.04] p-8">
        <Lock className="text-orange" size={34} />
        <h1 className="mt-6 font-display text-4xl font-black">Control Panel</h1>
        <p className="mt-3 text-sm text-muted">Sign in to manage Maithil Digitals content.</p>
        <label className="mt-8 block text-sm font-bold">Email</label>
        <input className={adminInput} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <label className="mt-4 block text-sm font-bold">Password</label>
        <div className="relative mt-2">
          <input className={`${adminInput} mt-0 pr-12`} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-white"
            type="button"
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {status ? <p className="mt-4 text-sm text-orange">{status}</p> : null}
        <Button className="mt-6 w-full" type="submit">Sign In</Button>
      </form>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <section className="grid min-h-screen place-items-center bg-ink px-4 py-32 text-white">{children}</section>;
}

function Dashboard() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => { adminApi.dashboard().then(setData).catch(() => setData({ error: "Dashboard unavailable" })); }, []);
  const cards = ["totalServices", "totalProjects", "totalVideos", "totalInsights", "totalTestimonials", "totalEnquiries"];
  return (
    <div>
      <SectionHeading eyebrow="Dashboard" title="CMS overview" description="Quick view of core website content and recent activity." />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((key) => <div key={key} className="rounded-premium border border-white/10 bg-ink p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-orange">{key.replace("total", "Total ")}</p><strong className="mt-3 block text-3xl">{String(data?.[key] ?? "0")}</strong></div>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">{["services", "projects", "videos", "insights"].map((item) => <button key={item} className="rounded-premium border border-white/10 px-4 py-3 text-sm font-bold text-white hover:border-orange"><Plus size={16} className="mr-2 inline" />Add {item.slice(0, -1)}</button>)}</div>
    </div>
  );
}

function ResourceManager({ resource, title, fields }: { resource: string; title: string; fields: string[] }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown>>({});
  const [message, setMessage] = useState("");
  const load = () => adminApi.list(resource).then((result) => setItems(result.items)).catch(() => setMessage("Unable to load content."));
  useEffect(() => {
    void load();
  }, [resource]);
  async function save() {
    setMessage("Saving...");
    try {
      const id = editing._id as string | undefined;
      if (id) await adminApi.update(resource, id, editing);
      else await adminApi.create(resource, editing);
      setEditing({});
      setMessage("Saved.");
      load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }
  async function remove(id: string) {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await adminApi.remove(resource, id);
    load();
  }
  return (
    <div>
      <SectionHeading eyebrow="CMS" title={title} description="Search, edit, publish and manage content through protected admin APIs." />
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="overflow-x-auto rounded-premium border border-white/10">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-ink text-muted"><tr>{fields.slice(0, 4).map((field) => <th key={field} className="p-4">{field}</th>)}<th className="p-4">Actions</th></tr></thead>
            <tbody>{items.length ? items.map((item) => <tr key={String(item._id)} className="border-t border-white/10">{fields.slice(0, 4).map((field) => <td key={field} className="p-4 text-muted">{String(item[field] ?? "")}</td>)}<td className="p-4"><button onClick={() => setEditing(item)} className="mr-3 text-orange">Edit</button><button onClick={() => remove(String(item._id))} className="text-muted"><Trash2 size={16} /></button></td></tr>) : <tr><td className="p-6 text-muted" colSpan={5}>No content has been added yet.</td></tr>}</tbody>
          </table>
        </div>
        <EditorPanel fields={fields} value={editing} onChange={setEditing} onSave={save} message={message} />
      </div>
    </div>
  );
}

function SingletonEditor({ resource, title }: { resource: string; title: string }) {
  const [value, setValue] = useState<Record<string, unknown>>({});
  const [message, setMessage] = useState("");
  async function save() {
    try {
      await adminApi.updateSingleton(resource, value);
      setMessage("Saved.");
    } catch {
      setMessage("Unable to save.");
    }
  }
  return <div><SectionHeading eyebrow="CMS" title={title} description="Paste JSON content for this singleton document. Keep this simple until custom editors are needed." /><div className="mt-8"><textarea className={`${adminInput} min-h-80 font-mono text-sm`} value={JSON.stringify(value, null, 2)} onChange={(e) => { try { setValue(JSON.parse(e.target.value)); } catch { setMessage("Invalid JSON"); } }} /><Button className="mt-4" onClick={save}><Save size={16} />Save</Button>{message ? <p className="mt-3 text-sm text-orange">{message}</p> : null}</div></div>;
}

function EditorPanel({ fields, value, onChange, onSave, message }: { fields: string[]; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void; onSave: () => void; message: string }) {
  return <div className="rounded-premium border border-white/10 bg-ink p-5"><h2 className="text-xl font-black">Editor</h2>{fields.map((field) => <label key={field} className="mt-4 block text-sm font-bold">{field}<input className={adminInput} value={String(value[field] ?? "")} onChange={(event) => onChange({ ...value, [field]: event.target.value })} /></label>)}<Button className="mt-5" onClick={onSave}>Save</Button>{message ? <p className="mt-3 text-sm text-orange">{message}</p> : null}</div>;
}

function MediaManager() {
  const [message, setMessage] = useState("");
  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const result = await adminApi.uploadImage(file);
      setMessage(`Image optimized to WebP. Saved ${formatBytes(result.savedBytes)}. URL: ${result.optimizedUrl}`);
    } catch {
      setMessage("Upload failed. Check ImageKit configuration.");
    }
  }
  async function uploadVideo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const result = await adminApi.uploadVideo(file);
      setMessage(`Video uploaded with optimized delivery. URL: ${result.optimizedUrl}`);
    } catch {
      setMessage("Video upload failed. Check ImageKit configuration and file size.");
    }
  }
  return (
    <div>
      <SectionHeading eyebrow="Media" title="Optimized media uploads" description="Images are converted to WebP before storage. Videos are uploaded to ImageKit with optimized delivery URLs." />
      <div className="mt-8 flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-premium border border-white/10 px-5 py-4 font-bold hover:border-orange">
          <ImageUp size={18} />Upload image
          <input className="hidden" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={uploadImage} />
        </label>
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-premium border border-white/10 px-5 py-4 font-bold hover:border-orange">
          <ImageUp size={18} />Upload video
          <input className="hidden" type="file" accept="video/mp4,video/webm,video/quicktime" onChange={uploadVideo} />
        </label>
      </div>
      {message ? <p className="mt-4 break-all text-sm text-orange">{message}</p> : null}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(1)} ${units[index]}`;
}

function AccountPanel({ onLogout }: { onLogout: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  async function save() {
    try {
      await adminApi.changePassword({ currentPassword, newPassword });
      setMessage("Password changed. Please sign in again.");
      onLogout();
    } catch {
      setMessage("Unable to change password.");
    }
  }
  return <div><SectionHeading eyebrow="Account" title="Admin account" /><label className="mt-8 block text-sm font-bold">Current password<input className={adminInput} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" /></label><label className="mt-4 block text-sm font-bold">New password<input className={adminInput} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" /></label><Button className="mt-5" onClick={save}>Change password</Button>{message ? <p className="mt-3 text-sm text-orange">{message}</p> : null}</div>;
}

const adminInput = "mt-2 w-full rounded-premium border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted focus:border-orange focus:outline-none";

const resourceMap: Record<string, { resource: string; title: string; fields: string[] }> = {
  services: { resource: "services", title: "Services", fields: ["title", "slug", "shortDescription", "category", "description"] },
  projects: { resource: "projects", title: "Projects / Work", fields: ["title", "slug", "client", "category", "year", "shortDescription"] },
  videos: { resource: "videos", title: "Videos", fields: ["title", "slug", "category", "videoUrl", "description"] },
  testimonials: { resource: "testimonials", title: "Testimonials", fields: ["clientName", "designation", "company", "testimonial"] },
  team: { resource: "team", title: "Team", fields: ["name", "designation", "bio", "linkedin"] },
  statistics: { resource: "statistics", title: "Statistics", fields: ["label", "value", "description", "icon"] },
  insights: { resource: "insights", title: "Insights", fields: ["title", "slug", "excerpt", "category", "content"] },
  faqs: { resource: "faqs", title: "FAQs", fields: ["question", "answer", "category", "sortOrder"] },
  enquiries: { resource: "enquiries", title: "Contacts / Enquiries", fields: ["name", "email", "phone", "status", "message"] }
};

const adminNav = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "settings", label: "Website Settings", icon: Settings },
  { key: "home", label: "Home", icon: FileText },
  { key: "about", label: "About", icon: FileText },
  { key: "services", label: "Services", icon: Search },
  { key: "projects", label: "Projects / Work", icon: BarChart3 },
  { key: "videos", label: "Videos", icon: FileText },
  { key: "testimonials", label: "Testimonials", icon: FileText },
  { key: "team", label: "Team", icon: FileText },
  { key: "statistics", label: "Statistics", icon: BarChart3 },
  { key: "insights", label: "Insights", icon: FileText },
  { key: "faqs", label: "FAQs", icon: FileText },
  { key: "enquiries", label: "Contacts / Enquiries", icon: FileText },
  { key: "seo", label: "SEO Settings", icon: Search },
  { key: "media", label: "Media", icon: ImageUp },
  { key: "account", label: "Admin Account", icon: Lock }
];
