import {
  BarChart3,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  ImageUp,
  LayoutDashboard,
  Link as LinkIcon,
  Lock,
  LogOut,
  Mail,
  Phone,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  UploadCloud
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";
import { packageCategories as fallbackPackageCategories } from "../data/fallback";
import { adminApi } from "../services/adminApi";

type ContentConfig = {
  resource: string;
  title: string;
  eyebrow: string;
  description: string;
  emptyText: string;
  primaryLabel: string;
  fields: FieldConfig[];
  summary: string[];
};

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url" | "date";
  placeholder?: string;
  span?: "full";
};

export function ControlPanel() {
  const [session, setSession] = useState<"checking" | "guest" | "admin">("checking");
  const [active, setActive] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    adminApi.me().then(() => setSession("admin")).catch(() => setSession("guest"));
  }, []);

  useEffect(() => {
    if (session === "guest" && location.pathname !== "/admin/login") navigate("/admin/login", { replace: true });
    if (session === "admin" && location.pathname === "/admin/login") navigate("/admin/dashboard", { replace: true });
  }, [location.pathname, navigate, session]);

  if (session === "checking") {
    return <AdminShell><StatusCard title="Checking secure session" description="Preparing your control panel." /></AdminShell>;
  }

  if (session === "guest") {
    return <AdminLogin onSuccess={() => {
      setSession("admin");
      navigate("/admin/dashboard", { replace: true });
    }} />;
  }

  const activeLabel = adminNav.find((item) => item.key === active)?.label ?? "Dashboard";

  return (
    <>
      <SEO seo={{ title: "Admin Dashboard | Maithil Digitals", description: "Administration dashboard for Maithil Digitals.", robots: "noindex,nofollow" }} />
      <div className="min-h-screen bg-[#090a13] text-white">
        <div className="mx-auto grid min-h-screen max-w-[1440px] gap-6 px-4 py-4 md:px-6 lg:grid-cols-[280px_1fr] lg:py-6">
          <aside className="self-start rounded-premium border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/20 lg:sticky lg:top-6">
            <div className="flex items-center gap-3 px-3 py-4">
              <span className="grid size-10 place-items-center rounded-premium bg-orange/10 text-orange"><Lock size={20} /></span>
              <div>
                <strong className="block text-base">Control Panel</strong>
                <span className="text-xs text-muted">Maithil Digitals</span>
              </div>
            </div>
            <nav className="mt-2 grid gap-1" aria-label="Admin navigation">
              {adminNav.map((item) => (
                <button key={item.key} onClick={() => setActive(item.key)} className={`flex min-h-11 items-center gap-3 rounded-premium px-3 text-left text-sm font-bold transition ${active === item.key ? "bg-orange text-white shadow-glow" : "text-muted hover:bg-white/[0.06] hover:text-white"}`}>
                  <item.icon size={17} /> {item.label}
                </button>
              ))}
              <button onClick={() => adminApi.logout().finally(() => setSession("guest"))} className="mt-4 flex min-h-11 items-center gap-3 rounded-premium px-3 text-left text-sm font-bold text-muted transition hover:bg-white/[0.06] hover:text-white"><LogOut size={17} /> Logout</button>
            </nav>
          </aside>

          <main className="min-w-0 rounded-premium border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4 md:px-7">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">Admin Workspace</p>
                <h1 className="mt-1 text-2xl font-black md:text-3xl">{activeLabel}</h1>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">Changes save to the live demo store now and will use MongoDB automatically once the backend is connected.</p>
            </div>
            <div className="p-5 md:p-7">
              {active === "dashboard" ? <Dashboard onOpen={setActive} /> : null}
              {active === "settings" ? <WebsiteSettings /> : null}
              {active === "seo" ? <SeoSettings /> : null}
              {active === "packages" ? <PackageSettings /> : null}
              {active === "videos" ? <MediaManager defaultTarget="videos" lockTarget lockMediaKind pageTitle="Videos" pageDescription="Upload a video from your device or paste a direct/social video URL, then publish it to the public Videos page with proper title, thumbnail and details." /> : null}
              {active !== "videos" && contentConfigs[active] ? <ContentManager config={contentConfigs[active]} /> : null}
              {active === "enquiries" ? <EnquiryManager /> : null}
              {active === "media" ? <MediaManager /> : null}
            </div>
          </main>
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
      <form onSubmit={submit} className="w-full max-w-md rounded-premium border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 md:p-8">
        <span className="grid size-12 place-items-center rounded-premium bg-orange/10 text-orange"><Lock size={26} /></span>
        <h1 className="mt-6 font-display text-4xl font-black">Control Panel</h1>
        <p className="mt-3 text-sm leading-6 text-muted">Sign in to manage the public website content and enquiries.</p>
        <Field label="Email" value={email} onChange={setEmail} type="text" className="mt-8" />
        <label className="mt-4 block text-sm font-bold">
          Password
          <div className="relative mt-2">
            <input className={`${adminInput} mt-0 pr-12`} value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} />
            <button aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-white" type="button" onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        {status ? <p className="mt-4 text-sm font-bold text-orange">{status}</p> : null}
        <Button className="mt-6 w-full" type="submit">Sign In</Button>
      </form>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <section className="grid min-h-screen place-items-center bg-[#090a13] px-4 py-20 text-white">{children}</section>;
}

function StatusCard({ title, description }: { title: string; description: string }) {
  return <div className="rounded-premium border border-white/10 bg-white/[0.05] p-6"><h1 className="text-xl font-black">{title}</h1><p className="mt-2 text-sm text-muted">{description}</p></div>;
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard({ onOpen }: { onOpen: (key: string) => void }) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => { adminApi.dashboard().then(setData).catch(() => setData({})); }, []);
  const cards = [
    { key: "totalServices", label: "Services", open: "services", icon: Search },
    { key: "totalProjects", label: "Projects", open: "projects", icon: BarChart3 },
    { key: "totalVideos", label: "Videos", open: "videos", icon: FileText },
    { key: "totalEnquiries", label: "Enquiries", open: "enquiries", icon: Mail },
    { key: "totalInsights", label: "Insights", open: "insights", icon: FileText },
    { key: "totalTestimonials", label: "Testimonials", open: "testimonials", icon: CheckCircle2 }
  ];
  return (
    <div>
      <PageIntro eyebrow="Dashboard" title="Website command center" description="Jump into the content areas that affect the public site, review enquiry volume, and keep your important website data tidy." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <button key={card.key} onClick={() => onOpen(card.open)} className="group rounded-premium border border-white/10 bg-[#0d0e1c] p-5 text-left transition hover:-translate-y-0.5 hover:border-orange">
            <span className="grid size-10 place-items-center rounded-premium bg-white/[0.06] text-orange"><card.icon size={18} /></span>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-muted">Total {card.label}</p>
            <strong className="mt-2 block text-4xl">{String(data?.[card.key] ?? "0")}</strong>
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-premium border border-white/10 bg-[#0d0e1c] p-5">
        <h3 className="text-xl font-black">Recommended workflow</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["Update business info", "Keep phone, email, address and socials accurate.", "settings"],
            ["Maintain content", "Add services, projects and videos with images and clean URLs.", "services"],
            ["Handle enquiries", "Review new leads and update their status as you follow up.", "enquiries"]
          ].map(([title, description, key]) => (
            <button key={title} onClick={() => onOpen(key)} className="rounded-premium border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-orange">
              <h4 className="font-black">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsiteSettings() {
  const [value, setValue] = useState<Record<string, unknown>>({});
  const [message, setMessage] = useState("");
  useEffect(() => setValue(adminApi.getSingleton("settings")), []);
  const update = (field: string, fieldValue: string) => setValue((current) => ({ ...current, [field]: fieldValue }));

  async function save() {
    await adminApi.updateSingleton("settings", value);
    setMessage("Saved. Public navigation, footer and contact details now use these values.");
  }

  return (
    <div>
      <PageIntro eyebrow="Website" title="Business settings" description="Manage the brand and contact details visitors see across the public website." action={<SaveButton onClick={save} label="Save settings" />} />
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Panel title="Core details" description="These fields power the header, footer and contact page.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Site name" value={String(value.siteName ?? "")} onChange={(text) => update("siteName", text)} />
            <Field label="Tagline" value={String(value.tagline ?? "")} onChange={(text) => update("tagline", text)} />
            <Field label="Email address" icon={<Mail size={16} />} value={String(value.email ?? "")} onChange={(text) => update("email", text)} />
            <Field label="WhatsApp number" icon={<Phone size={16} />} value={String(value.whatsapp ?? "")} onChange={(text) => update("whatsapp", text)} />
            <Field label="Phone numbers" icon={<Phone size={16} />} value={Array.isArray(value.phone) ? value.phone.join(", ") : String(value.phone ?? "")} helper="Separate multiple numbers with commas." onChange={(text) => setValue((current) => ({ ...current, phone: text.split(",").map((item) => item.trim()).filter(Boolean) }))} />
            <Field label="Address" value={String(value.address ?? "")} onChange={(text) => update("address", text)} />
            <Field label="Footer description" textarea className="md:col-span-2" value={String(value.footerDescription ?? "")} onChange={(text) => update("footerDescription", text)} />
          </div>
        </Panel>
        <Panel title="Social links" description="Use full URLs so buttons open correctly.">
          <div className="grid gap-4">
            <Field label="Instagram URL" icon={<LinkIcon size={16} />} value={String(value.instagramUrl ?? "")} onChange={(text) => update("instagramUrl", text)} />
            <Field label="Facebook URL" icon={<LinkIcon size={16} />} value={String(value.facebookUrl ?? "")} onChange={(text) => update("facebookUrl", text)} />
            <Field label="WhatsApp URL" icon={<LinkIcon size={16} />} value={String(value.whatsappUrl ?? "")} onChange={(text) => update("whatsappUrl", text)} />
            <Field label="Email URL" icon={<LinkIcon size={16} />} value={String(value.emailUrl ?? "")} onChange={(text) => update("emailUrl", text)} />
          </div>
        </Panel>
      </div>
      <SaveMessage message={message} />
    </div>
  );
}

function SeoSettings() {
  const [items, setItems] = useState<Record<string, { title?: string; description?: string; canonical?: string; robots?: string }>>({});
  const [message, setMessage] = useState("");
  useEffect(() => setItems(adminApi.getSingleton("seo") as typeof items), []);
  const pages = [
    { key: "home", label: "Home" },
    { key: "services", label: "Services" },
    { key: "work", label: "Work" },
    { key: "packages", label: "Packages" },
    { key: "about", label: "About" },
    { key: "videos", label: "Videos" },
    { key: "contact", label: "Contact" }
  ];
  const update = (page: string, field: string, fieldValue: string) => setItems((current) => ({ ...current, [page]: { ...(current[page] ?? {}), [field]: fieldValue } }));

  async function save() {
    await adminApi.updateSingleton("seo", items);
    setMessage("Saved. Meta tags update immediately in the browser; Google updates after it recrawls the deployed page.");
  }

  return (
    <div>
      <PageIntro eyebrow="SEO" title="Search appearance" description="Control page titles, descriptions, canonical URLs and robots rules without editing code." action={<SaveButton onClick={save} label="Save SEO" />} />
      <div className="mt-8 grid gap-4">
        {pages.map((page) => (
          <Panel key={page.key} title={`${page.label} page`} description="Keep titles concise and descriptions readable for search previews.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Meta title" value={items[page.key]?.title ?? ""} onChange={(text) => update(page.key, "title", text)} />
              <Field label="Robots" value={items[page.key]?.robots ?? "index,follow"} onChange={(text) => update(page.key, "robots", text)} />
              <Field label="Meta description" textarea className="md:col-span-2" value={items[page.key]?.description ?? ""} onChange={(text) => update(page.key, "description", text)} />
              <Field label="Canonical URL" className="md:col-span-2" value={items[page.key]?.canonical ?? ""} onChange={(text) => update(page.key, "canonical", text)} />
            </div>
          </Panel>
        ))}
      </div>
      <SaveMessage message={message} />
    </div>
  );
}

function PackageSettings() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = adminApi.getSingleton("packages") as { items?: Record<string, unknown>[] };
    const categoryStore = adminApi.getSingleton("packageCategories") as { items?: Record<string, unknown>[] };
    setItems(stored.items ?? []);
    setCategories(categoryStore.items ?? fallbackPackageCategories);
  }, []);

  const update = (index: number, field: string, value: string) => {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  };
  const updateCategory = (index: number, field: string, value: string) => {
    setCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  };

  const add = () => setItems((current) => [...current, { name: "", label: "", description: "", badge: "", cta: "View Package", features: "" }]);
  const addCategory = () => setCategories((current) => [...current, { title: "", description: "", services: "" }]);
  const remove = (index: number) => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  const removeCategory = (index: number) => setCategories((current) => current.filter((_, itemIndex) => itemIndex !== index));

  async function save() {
    await adminApi.updateSingleton("packages", { items, categories });
    await adminApi.updateSingleton("packageCategories", { items: categories });
    setMessage("Saved. Package plans and categories update on the Home and Packages pages.");
  }

  return (
    <div>
      <PageIntro eyebrow="Packages" title="Package plans" description="Manage the simplified package cards used on the homepage and the detailed Packages page." action={<button className={adminButton} onClick={add}><Plus size={16} />New package</button>} />
      <div className="mt-8 grid gap-5">
        {items.map((item, index) => (
          <Panel key={index} title={String(item.name || `Package ${index + 1}`)} description="Write clear labels, package details and feature bullets. Separate features with commas.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Package name" value={String(item.name ?? "")} onChange={(value) => update(index, "name", value)} placeholder="Growth" />
              <Field label="Badge" value={String(item.badge ?? "")} onChange={(value) => update(index, "badge", value)} placeholder="Most Popular" />
              <Field label="Short label" className="md:col-span-2" value={String(item.label ?? "")} onChange={(value) => update(index, "label", value)} placeholder="For businesses ready to build a consistent online presence." />
              <Field label="Description" textarea className="md:col-span-2" value={String(item.description ?? "")} onChange={(value) => update(index, "description", value)} placeholder="Explain who this package is for." />
              <Field label="Features" textarea value={Array.isArray(item.features) ? item.features.join(", ") : String(item.features ?? "")} onChange={(value) => update(index, "features", value)} placeholder="Monthly content calendar, Reels support, Creative posts" />
              <Field label="CTA text" value={String(item.cta ?? "")} onChange={(value) => update(index, "cta", value)} placeholder="View Package" />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className={dangerButton} onClick={() => remove(index)}><Trash2 size={16} />Delete</button>
            </div>
          </Panel>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">Package Categories</p>
          <h3 className="mt-2 text-2xl font-black">Business category pages</h3>
          <p className="mt-2 text-sm text-muted">These create clickable category pages on the Packages screen.</p>
        </div>
        <button className={secondaryButton} onClick={addCategory}><Plus size={16} />Add category</button>
      </div>
      <div className="mt-5 grid gap-5">
        {categories.map((item, index) => (
          <Panel key={index} title={String(item.title || `Category ${index + 1}`)} description="Separate services with commas. Example: Reels, Photography, Meta Ads.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Category title" value={String(item.title ?? "")} onChange={(value) => updateCategory(index, "title", value)} placeholder="Restaurants & Cafes" />
              <Field label="Services" value={Array.isArray(item.services) ? item.services.join(", ") : String(item.services ?? "")} onChange={(value) => updateCategory(index, "services", value)} placeholder="Social Media, Food Photography, Reels" />
              <Field label="Description" textarea className="md:col-span-2" value={String(item.description ?? "")} onChange={(value) => updateCategory(index, "description", value)} placeholder="Describe what this category package includes." />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className={dangerButton} onClick={() => removeCategory(index)}><Trash2 size={16} />Delete</button>
            </div>
          </Panel>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className={adminButton} onClick={save}><Save size={16} />Save packages</button>
        <button className={secondaryButton} onClick={add}><Plus size={16} />Add plan</button>
      </div>
      <SaveMessage message={message} />
    </div>
  );
}

function ContentManager({ config }: { config: ContentConfig }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown>>({});
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const load = () => adminApi.list(config.resource).then((result) => setItems(result.items)).catch(() => setMessage("Unable to load content."));
  useEffect(() => {
    setEditing({});
    setMessage("");
    void load();
  }, [config.resource]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return items;
    return items.filter((item) => Object.values(item).join(" ").toLowerCase().includes(search));
  }, [items, query]);

  async function save() {
    setMessage("Saving...");
    try {
      const id = editing._id as string | undefined;
      if (id) await adminApi.update(config.resource, id, editing);
      else await adminApi.create(config.resource, editing);
      setEditing({});
      setMessage("Saved. Public pages now use the updated content.");
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this record?")) return;
    await adminApi.remove(config.resource, id);
    setMessage("Record deleted.");
    await load();
  }

  return (
    <div>
      <PageIntro eyebrow={config.eyebrow} title={config.title} description={config.description} action={<button onClick={() => setEditing({})} className={adminButton}><Plus size={16} />{config.primaryLabel}</button>} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
        <Panel title="Records" description={`${filtered.length} item${filtered.length === 1 ? "" : "s"} available`}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} />
            <input className={`${adminInput} mt-0 pl-10`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${config.title.toLowerCase()}`} />
          </div>
          <div className="mt-4 grid gap-3">
            {filtered.length ? filtered.map((item) => (
              <article key={String(item._id)} className={`rounded-premium border p-4 transition ${String(editing._id ?? "") === String(item._id) ? "border-orange bg-orange/10" : "border-white/10 bg-white/[0.035] hover:border-white/20"}`}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black">{String(item.title ?? item.name ?? "Untitled")}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {config.summary.map((key) => String(item[key] ?? "").trim() ? <span key={key} className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-bold text-muted">{labelFromKey(key)}: {String(item[key])}</span> : null)}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button className={actionButton} onClick={() => setEditing(item)}><Edit3 size={16} />Edit</button>
                    <button className={dangerButton} onClick={() => remove(String(item._id))}><Trash2 size={16} />Delete</button>
                  </div>
                </div>
              </article>
            )) : <EmptyState title={config.emptyText} description="Use the editor to create the first record." />}
          </div>
        </Panel>
        <EditorCard config={config} value={editing} onChange={setEditing} onSave={save} message={message} />
      </div>
    </div>
  );
}

function EditorCard({ config, value, onChange, onSave, message }: { config: ContentConfig; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void; onSave: () => void; message: string }) {
  return (
    <Panel title={value._id ? "Edit record" : "Create record"} description="Fill the important fields first. Optional fields can be improved later." sticky>
      {["services", "projects", "insights", "testimonials", "team"].includes(config.resource) ? <InlineMediaControls resource={config.resource} value={value} onChange={onChange} /> : null}
      <div className="grid gap-4">
        {config.fields.map((field) => (
          <Field key={field.key} label={field.label} type={field.type} textarea={field.type === "textarea"} value={String(value[field.key] ?? "")} placeholder={field.placeholder} onChange={(text) => onChange({ ...value, [field.key]: text })} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className={adminButton} onClick={onSave}><Save size={16} />Save</button>
        <button className={secondaryButton} onClick={() => onChange({})}>Clear</button>
      </div>
      <SaveMessage message={message} />
    </Panel>
  );
}

function InlineMediaControls({ resource, value, onChange }: { resource: string; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void }) {
  const [kind, setKind] = useState<"image" | "video">("image");
  const [source, setSource] = useState<"device" | "url" | "social">("device");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const label = resource === "projects" ? "work/project" : "service";

  const applyUrl = (mediaUrl: string) => {
    const normalized = kind === "video" ? toEmbedUrl(mediaUrl) : mediaUrl;
    onChange({ ...value, [kind === "image" ? "imageUrl" : "videoUrl"]: normalized });
    setUrl(normalized);
    setStatus(`${kind === "image" ? "Image" : "Video"} attached to this ${label}. Save the record to publish it.`);
  };

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus("Uploading...");
    try {
      const result = kind === "image" ? await adminApi.uploadImage(file) : await adminApi.uploadVideo(file);
      applyUrl(result.optimizedUrl);
    } catch {
      setStatus("Upload failed. You can still paste a direct, YouTube or social URL.");
    }
  }

  return (
    <div className="mb-5 rounded-premium border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-black">Media for this {label}</h4>
          <p className="mt-1 text-sm leading-6 text-muted">Attach an image or video from device upload, direct URL, YouTube, or social media.</p>
        </div>
        <ImageUp className="shrink-0 text-orange" size={20} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <SelectField label="Media type" value={kind} onChange={(next) => setKind(next as "image" | "video")} options={[["image", "Image"], ["video", "Video"]]} />
        <SelectField label="Source" value={source} onChange={(next) => setSource(next as "device" | "url" | "social")} options={[["device", "Browse device"], ["url", "Direct URL"], ["social", "YouTube/social link"]]} />
      </div>
      {source === "device" ? (
        <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-premium border border-white/15 px-4 py-3 text-sm font-black transition hover:border-orange hover:text-orange">
          <span>{kind === "image" ? "Upload image" : "Upload video"}</span>
          <UploadCloud size={17} />
          <input className="hidden" type="file" accept={kind === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "video/mp4,video/webm,video/quicktime"} onChange={upload} />
        </label>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input className={`${adminInput} mt-0`} value={url} onChange={(event) => setUrl(event.target.value)} placeholder={kind === "video" ? "Paste YouTube, social or embed URL" : "Paste image URL"} />
          <button className={`${secondaryButton} shrink-0`} onClick={() => applyUrl(url)}>Attach</button>
        </div>
      )}
      <div className="mt-4 grid gap-2 text-xs font-bold text-muted">
        <p>Image URL: <span className="break-all text-white">{String(value.imageUrl ?? "Not attached")}</span></p>
        <p>Video URL: <span className="break-all text-white">{String(value.videoUrl ?? "Not attached")}</span></p>
      </div>
      {status ? <p className="mt-3 text-sm font-bold text-orange">{status}</p> : null}
    </div>
  );
}

function EnquiryManager() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState("");
  const load = () => adminApi.list("enquiries").then((result) => setItems(result.items)).catch(() => setMessage("Unable to load enquiries."));
  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await adminApi.updateEnquiryStatus(id, status);
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this enquiry?")) return;
    await adminApi.remove("enquiries", id);
    await load();
  }

  return (
    <div>
      <PageIntro eyebrow="Inbox" title="Contacts and enquiries" description="Review every public contact form submission, follow up quickly, and track each lead status." />
      <div className="mt-8 grid gap-4">
        {items.length ? items.map((item) => (
          <article key={String(item._id)} className="rounded-premium border border-white/10 bg-[#0d0e1c] p-5">
            <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr_auto]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-orange">{String(item.status ?? "new")}</p>
                <h3 className="mt-2 text-xl font-black">{String(item.name ?? "Unnamed enquiry")}</h3>
                <p className="mt-2 text-sm text-muted">{item.createdAt ? new Date(String(item.createdAt)).toLocaleString() : "No date available"}</p>
              </div>
              <div className="grid gap-3 text-sm text-muted md:grid-cols-2">
                <a className="flex items-center gap-2 hover:text-white" href={`mailto:${String(item.email ?? "")}`}><Mail size={16} />{String(item.email ?? "")}</a>
                <a className="flex items-center gap-2 hover:text-white" href={`tel:${String(item.phone ?? "")}`}><Phone size={16} />{String(item.phone ?? "")}</a>
                <p><span className="font-bold text-white">Business:</span> {String(item.businessName ?? item.company ?? "-")}</p>
                <p><span className="font-bold text-white">Type:</span> {String(item.businessType ?? "-")}</p>
                <p><span className="font-bold text-white">Service:</span> {String(item.servicesRequired ?? item.service ?? "-")}</p>
                <p className="md:col-span-2"><span className="font-bold text-white">Message:</span> {String(item.message ?? "")}</p>
              </div>
              <div className="flex items-start gap-2">
                <select className={`${adminInput} mt-0 min-w-36`} value={String(item.status ?? "New")} onChange={(event) => updateStatus(String(item._id), event.target.value)}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
                <button onClick={() => remove(String(item._id))} className={dangerButton}><Trash2 size={16} />Delete</button>
              </div>
            </div>
          </article>
        )) : <EmptyState title="No enquiries yet" description="Submit the public contact form to test this workflow." />}
      </div>
      <SaveMessage message={message} />
    </div>
  );
}

function MediaManager({ defaultTarget = "videos", lockTarget = false, lockMediaKind = false, pageTitle = "Publish media", pageDescription = "Upload from your device or paste a social/direct URL, choose where it belongs, and publish it into the public application." }: { defaultTarget?: "services" | "projects" | "videos"; lockTarget?: boolean; lockMediaKind?: boolean; pageTitle?: string; pageDescription?: string }) {
  const [target, setTarget] = useState<"services" | "projects" | "videos">(defaultTarget);
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [recordId, setRecordId] = useState("");
  const [mediaKind, setMediaKind] = useState<"image" | "video">(lockMediaKind ? "video" : "video");
  const [sourceType, setSourceType] = useState<"device" | "url" | "social">("device");
  const [form, setForm] = useState<Record<string, string>>({
    title: "",
    slug: "",
    category: "",
    client: "",
    year: "",
    duration: "",
    publishDate: "",
    mediaUrl: "",
    thumbnailUrl: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminApi.list(target).then((result) => setRecords(result.items)).catch(() => setRecords([]));
    setRecordId("");
  }, [target]);

  const selectedConfig = contentConfigs[target];
  const isVideoTarget = target === "videos";
  const accept = mediaKind === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "video/mp4,video/webm,video/quicktime";

  const update = (field: string, value: string) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "title" && !current.slug) next.slug = slugify(value);
      return next;
    });
  };

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const result = mediaKind === "image" ? await adminApi.uploadImage(file) : await adminApi.uploadVideo(file);
      setForm((current) => ({
        ...current,
        mediaUrl: result.optimizedUrl,
        thumbnailUrl: mediaKind === "image" ? result.optimizedUrl : current.thumbnailUrl
      }));
      setMessage(`${mediaKind === "image" ? "Image" : "Video"} uploaded. Review the destination and save it to publish.`);
    } catch {
      setMessage("Upload failed. Check ImageKit configuration or use a direct/social URL for now.");
    }
  }

  async function publishMedia() {
    const mediaUrl = form.mediaUrl.trim();
    if (!mediaUrl) {
      setMessage("Add a file, direct URL or social/video URL before publishing.");
      return;
    }

    const payload = buildMediaPayload(target, form, mediaUrl, mediaKind);
    try {
      if (mode === "existing" && recordId) {
        const current = records.find((record) => String(record._id) === recordId) ?? {};
        await adminApi.update(target, recordId, { ...current, ...payload });
        setMessage(`Media attached to the selected ${selectedConfig.title.toLowerCase()} record.`);
      } else {
        await adminApi.create(target, payload);
        setMessage(`New ${selectedConfig.title.toLowerCase()} record created and reflected in the public app.`);
      }
      const result = await adminApi.list(target);
      setRecords(result.items);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to publish media.");
    }
  }

  return (
    <div>
      <PageIntro eyebrow={lockTarget ? "Media Content" : "Media"} title={pageTitle} description={pageDescription} action={<button className={adminButton} onClick={publishMedia}><Save size={16} />Publish media</button>} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <Panel title="Source and destination" description="Tell the system what this media is and where it should appear.">
          <div className="grid gap-4 md:grid-cols-2">
            {!lockMediaKind ? <SelectField label="Media type" value={mediaKind} onChange={(value) => setMediaKind(value as "image" | "video")} options={[["image", "Image"], ["video", "Video"]]} /> : <ReadOnlyField label="Media type" value="Video" />}
            <SelectField label="Source" value={sourceType} onChange={(value) => setSourceType(value as "device" | "url" | "social")} options={[["device", "Upload from device"], ["url", "Direct media URL"], ["social", "Social/video URL"]]} />
            {!lockTarget ? <SelectField label="Publish to" value={target} onChange={(value) => setTarget(value as "services" | "projects" | "videos")} options={[["videos", "Videos page"], ["projects", "Projects / Work"], ["services", "Services"]]} /> : <ReadOnlyField label="Publish to" value="Videos page" />}
            <SelectField label="Action" value={mode} onChange={(value) => setMode(value as "new" | "existing")} options={[["new", "Create new record"], ["existing", "Attach to existing"]]} />
          </div>

          {mode === "existing" ? (
            <SelectField className="mt-4" label="Existing record" value={recordId} onChange={setRecordId} options={[["", "Choose a record"], ...records.map((record) => [String(record._id), String(record.title ?? record.name ?? "Untitled")])]} />
          ) : null}

          {sourceType === "device" ? (
            <label className="mt-5 block rounded-premium border border-dashed border-white/20 bg-white/[0.035] p-5">
              <span className="flex items-center gap-3 text-lg font-black"><UploadCloud className="text-orange" size={22} />Choose {mediaKind}</span>
              <span className="mt-2 block text-sm leading-6 text-muted">{mediaKind === "image" ? "JPG, PNG, WebP or AVIF." : "MP4, WebM or MOV."} The returned URL will be placed into the form.</span>
              <span className="mt-4 inline-flex min-h-11 items-center rounded-premium border border-white/15 px-4 text-sm font-black transition hover:border-orange hover:text-orange">Browse file</span>
              <input className="hidden" type="file" accept={accept} onChange={uploadFile} />
            </label>
          ) : (
            <Field className="mt-5" label={sourceType === "social" ? "Social or embed URL" : "Direct media URL"} value={form.mediaUrl} onChange={(value) => update("mediaUrl", value)} placeholder={mediaKind === "video" ? "https://www.youtube.com/embed/..." : "https://..."} />
          )}

          {form.mediaUrl ? (
            <div className="mt-5 rounded-premium border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-orange">Selected media URL</p>
              <p className="mt-2 break-all text-sm text-muted">{form.mediaUrl}</p>
            </div>
          ) : null}
        </Panel>

        <Panel title={mode === "existing" ? "Attachment details" : `New ${selectedConfig.title} record`} description="These details decide how the media appears in the selected public page.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={form.title} onChange={(value) => update("title", value)} placeholder={isVideoTarget ? "Campaign Showreel" : "Brand Growth Campaign"} />
            <Field label="URL slug" value={form.slug} onChange={(value) => update("slug", value)} placeholder="campaign-showreel" />
            <Field label="Category" value={form.category} onChange={(value) => update("category", value)} placeholder={isVideoTarget ? "Brand Video" : "Digital Marketing"} />
            {target === "projects" ? <Field label="Client" value={form.client} onChange={(value) => update("client", value)} placeholder="Client name" /> : null}
            {target === "projects" ? <Field label="Year" value={form.year} onChange={(value) => update("year", value)} placeholder="2026" /> : null}
            {isVideoTarget ? <Field label="Duration" value={form.duration} onChange={(value) => update("duration", value)} placeholder="01:24" /> : null}
            {isVideoTarget ? <Field label="Publish date" type="date" value={form.publishDate} onChange={(value) => update("publishDate", value)} /> : null}
            {isVideoTarget ? <Field label="Thumbnail URL" value={form.thumbnailUrl} onChange={(value) => update("thumbnailUrl", value)} placeholder="https://..." className="md:col-span-2" /> : null}
            <Field label="Description" textarea className="md:col-span-2" value={form.description} onChange={(value) => update("description", value)} placeholder="Write the public description for this item." />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className={adminButton} onClick={publishMedia}><Save size={16} />Publish media</button>
            <button className={secondaryButton} onClick={() => setForm({ title: "", slug: "", category: "", client: "", year: "", duration: "", publishDate: "", mediaUrl: "", thumbnailUrl: "", description: "" })}>Clear form</button>
          </div>
        </Panel>
      </div>
      <SaveMessage message={message} />
    </div>
  );
}

function Panel({ title, description, children, sticky = false }: { title: string; description?: string; children: ReactNode; sticky?: boolean }) {
  return (
    <section className={`rounded-premium border border-white/10 bg-[#0d0e1c] p-5 ${sticky ? "xl:sticky xl:top-6" : ""}`}>
      <div className="mb-5">
        <h3 className="text-xl font-black">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function SelectField({ label, value, onChange, options, className = "" }: { label: string; value: string; onChange: (value: string) => void; options: string[][]; className?: string }) {
  return (
    <label className={`block text-sm font-bold ${className}`}>
      {label}
      <select className={adminInput} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="block text-sm font-bold">
      {label}
      <div className="mt-2 flex min-h-12 items-center rounded-premium border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white">{value}</div>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, icon, className = "", placeholder, helper, type = "text" }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; icon?: ReactNode; className?: string; placeholder?: string; helper?: string; type?: string }) {
  return (
    <label className={`block text-sm font-bold ${className}`}>
      <span className="flex items-center gap-2">{icon}{label}</span>
      {textarea ? (
        <textarea className={`${adminInput} min-h-28 resize-y`} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={adminInput} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
      {helper ? <span className="mt-2 block text-xs font-semibold text-muted">{helper}</span> : null}
    </label>
  );
}

function SaveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button className={adminButton} onClick={onClick}><Save size={16} />{label}</button>;
}

function SaveMessage({ message }: { message: string }) {
  return message ? <p className="mt-4 inline-flex items-center gap-2 rounded-premium border border-orange/25 bg-orange/10 px-3 py-2 text-sm font-bold text-orange"><CheckCircle2 size={16} />{message}</p> : null;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-premium border border-dashed border-white/15 bg-white/[0.025] p-8 text-center"><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm text-muted">{description}</p></div>;
}

function labelFromKey(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildMediaPayload(target: "services" | "projects" | "videos", form: Record<string, string>, mediaUrl: string, mediaKind: "image" | "video") {
  const title = form.title.trim() || (target === "videos" ? "New Video" : "New Media");
  const base = {
    title,
    slug: form.slug.trim() || slugify(title),
    category: form.category.trim(),
    description: form.description.trim(),
    shortDescription: form.description.trim()
  };

  if (target === "videos") {
    return {
      ...base,
      videoUrl: toEmbedUrl(mediaUrl),
      thumbnailUrl: form.thumbnailUrl.trim(),
      duration: form.duration.trim(),
      publishDate: form.publishDate || new Date().toISOString().slice(0, 10)
    };
  }

  if (target === "projects") {
    return {
      ...base,
      client: form.client.trim(),
      year: form.year.trim() || new Date().getFullYear().toString(),
      ...(mediaKind === "image" ? { imageUrl: mediaUrl } : {}),
      ...(mediaKind === "video" ? { videoUrl: toEmbedUrl(mediaUrl) } : {}),
      ...(form.thumbnailUrl.trim() ? { imageUrl: form.thumbnailUrl.trim() } : {}),
      challenge: form.description.trim(),
      strategy: "",
      execution: ""
    };
  }

  return {
    ...base,
    ...(mediaKind === "image" ? { imageUrl: mediaUrl } : {}),
    ...(mediaKind === "video" ? { videoUrl: toEmbedUrl(mediaUrl) } : {}),
    overview: form.description.trim()
  };
}

function toEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  return url;
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(1)} ${units[index]}`;
}

const adminInput = "mt-2 min-h-12 w-full rounded-premium border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-ink placeholder:text-[#7b7f8f] shadow-sm focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/25";
const adminButton = "inline-flex min-h-12 min-w-36 items-center justify-center gap-2 rounded-premium bg-orange px-5 text-sm font-black text-white shadow-glow transition hover:bg-orangeHover";
const secondaryButton = "inline-flex min-h-12 min-w-28 items-center justify-center rounded-premium border border-white/15 px-5 text-sm font-black text-white transition hover:border-orange hover:text-orange";
const actionButton = "inline-flex min-h-11 min-w-24 items-center justify-center gap-2 rounded-premium border border-white/15 bg-white/[0.045] px-4 text-sm font-black text-white transition hover:border-orange hover:bg-orange hover:text-white";
const dangerButton = "inline-flex min-h-11 min-w-24 items-center justify-center gap-2 rounded-premium border border-white/15 bg-white/[0.045] px-4 text-sm font-black text-muted transition hover:border-orange hover:text-orange";

const contentConfigs: Record<string, ContentConfig> = {
  services: {
    resource: "services",
    title: "Services",
    eyebrow: "Content",
    description: "Create service pages with clean titles, URLs, categories, inclusions, CTAs and visual assets.",
    emptyText: "No services added",
    primaryLabel: "New service",
    summary: ["slug", "category", "shortDescription"],
    fields: [
      { key: "title", label: "Service title", placeholder: "Social Media Management" },
      { key: "slug", label: "URL slug", placeholder: "social-media-management" },
      { key: "shortDescription", label: "Short description", type: "textarea", placeholder: "One or two lines shown on cards." },
      { key: "category", label: "Category", placeholder: "Social Media" },
      { key: "cta", label: "CTA text", placeholder: "Explore Social Media" },
      { key: "includes", label: "Includes", type: "textarea", placeholder: "Content planning, Instagram management, Captions and hashtags" },
      { key: "tags", label: "Tags", placeholder: "Instagram, Facebook, Strategy" },
      { key: "imageUrl", label: "Image URL", type: "url", placeholder: "https://..." },
      { key: "videoUrl", label: "Video URL", type: "url", placeholder: "YouTube, social or embed URL" },
      { key: "overview", label: "Overview", type: "textarea", placeholder: "Explain what this service does." },
      { key: "problems", label: "Problems solved", type: "textarea", placeholder: "Irregular posting, Weak social identity, Low engagement" },
      { key: "approach", label: "Approach", type: "textarea", placeholder: "Understand your business, Plan monthly content, Publish and review" },
      { key: "capabilities", label: "Capabilities", type: "textarea", placeholder: "Content planning, Account management, Captions, Scheduling" },
      { key: "faq", label: "Service FAQ", type: "textarea", placeholder: "Question one?|Answer one.\nQuestion two?|Answer two." },
      { key: "description", label: "Detailed description", type: "textarea", placeholder: "Longer service details." }
    ]
  },
  projects: {
    resource: "projects",
    title: "Projects / Work",
    eyebrow: "Portfolio",
    description: "Maintain case studies with client, category, year, summary, story and visuals.",
    emptyText: "No projects added",
    primaryLabel: "New project",
    summary: ["client", "category", "year"],
    fields: [
      { key: "title", label: "Project title", placeholder: "Brand Growth Campaign" },
      { key: "slug", label: "URL slug", placeholder: "brand-growth-campaign" },
      { key: "client", label: "Client", placeholder: "Local retail brand" },
      { key: "category", label: "Category", placeholder: "Digital Marketing" },
      { key: "year", label: "Year", placeholder: "2026" },
      { key: "imageUrl", label: "Cover image URL", type: "url", placeholder: "https://..." },
      { key: "videoUrl", label: "Project video URL", type: "url", placeholder: "YouTube, social or embed URL" },
      { key: "deliverables", label: "Deliverables", type: "textarea", placeholder: "Social media management, Food photography, Reels" },
      { key: "shortDescription", label: "Short summary", type: "textarea" },
      { key: "challenge", label: "Challenge", type: "textarea" },
      { key: "strategy", label: "Strategy", type: "textarea" },
      { key: "execution", label: "Execution", type: "textarea" }
    ]
  },
  videos: {
    resource: "videos",
    title: "Videos",
    eyebrow: "Media Content",
    description: "Manage public video entries with titles, categories, thumbnails and playable embed URLs.",
    emptyText: "No videos added",
    primaryLabel: "New video",
    summary: ["slug", "category", "videoUrl"],
    fields: [
      { key: "title", label: "Video title", placeholder: "Campaign Showreel" },
      { key: "slug", label: "URL slug", placeholder: "campaign-showreel" },
      { key: "category", label: "Category", placeholder: "Brand Video" },
      { key: "videoUrl", label: "Video embed URL", type: "url", placeholder: "https://www.youtube.com/embed/..." },
      { key: "thumbnailUrl", label: "Thumbnail URL", type: "url", placeholder: "https://..." },
      { key: "duration", label: "Duration", placeholder: "01:24" },
      { key: "publishDate", label: "Publish date", type: "date" },
      { key: "description", label: "Description", type: "textarea" }
    ]
  },
  insights: {
    resource: "insights",
    title: "Insights",
    eyebrow: "Articles",
    description: "Publish insight articles that appear on the public Insights page and detail pages.",
    emptyText: "No insights added",
    primaryLabel: "New insight",
    summary: ["slug", "category", "status"],
    fields: [
      { key: "title", label: "Insight title", placeholder: "How local brands can grow online" },
      { key: "slug", label: "URL slug", placeholder: "local-brands-grow-online" },
      { key: "excerpt", label: "Excerpt", type: "textarea", placeholder: "Short preview shown on cards." },
      { key: "content", label: "Article body", type: "textarea", placeholder: "Write paragraphs on separate lines." },
      { key: "category", label: "Category", placeholder: "Digital Marketing" },
      { key: "author", label: "Author", placeholder: "Maithil Digitals" },
      { key: "readTime", label: "Read time", placeholder: "4 min read" },
      { key: "publishDate", label: "Publish date", type: "date" },
      { key: "imageUrl", label: "Featured image URL", type: "url", placeholder: "https://..." },
      { key: "tags", label: "Tags", placeholder: "SEO, Branding, Social Media" },
      { key: "status", label: "Status", placeholder: "published" }
    ]
  },
  faqs: {
    resource: "faqs",
    title: "FAQs",
    eyebrow: "Questions",
    description: "Manage the questions shown on the public homepage FAQ section.",
    emptyText: "No FAQs added",
    primaryLabel: "New FAQ",
    summary: ["category", "sortOrder"],
    fields: [
      { key: "question", label: "Question", placeholder: "Do you create reels?" },
      { key: "answer", label: "Answer", type: "textarea", placeholder: "Yes. We plan, shoot and edit short-form video content." },
      { key: "category", label: "Category", placeholder: "General" },
      { key: "sortOrder", label: "Sort order", placeholder: "1" }
    ]
  },
  statistics: {
    resource: "statistics",
    title: "Statistics",
    eyebrow: "About Page",
    description: "Control the statistic cards rendered on the public About page.",
    emptyText: "No statistics added",
    primaryLabel: "New stat",
    summary: ["value", "sortOrder"],
    fields: [
      { key: "label", label: "Label", placeholder: "Business categories" },
      { key: "value", label: "Value", placeholder: "8+" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Optional internal/context text." },
      { key: "sortOrder", label: "Sort order", placeholder: "1" }
    ]
  },
  testimonials: {
    resource: "testimonials",
    title: "Testimonials",
    eyebrow: "Social Proof",
    description: "Manage client testimonials for reusable public sections.",
    emptyText: "No testimonials added",
    primaryLabel: "New testimonial",
    summary: ["company", "designation", "rating"],
    fields: [
      { key: "clientName", label: "Client name", placeholder: "Client Name" },
      { key: "designation", label: "Designation", placeholder: "Founder" },
      { key: "company", label: "Company", placeholder: "Client Company" },
      { key: "testimonial", label: "Testimonial", type: "textarea", placeholder: "Write the client's feedback." },
      { key: "imageUrl", label: "Client photo URL", type: "url", placeholder: "https://..." },
      { key: "rating", label: "Rating", placeholder: "5" }
    ]
  },
  team: {
    resource: "team",
    title: "Team",
    eyebrow: "About Page",
    description: "Manage active team profiles for public team sections.",
    emptyText: "No team members added",
    primaryLabel: "New member",
    summary: ["designation", "linkedin"],
    fields: [
      { key: "name", label: "Name", placeholder: "Team member name" },
      { key: "designation", label: "Role", placeholder: "Creative Strategist" },
      { key: "bio", label: "Bio", type: "textarea", placeholder: "Short profile or role summary." },
      { key: "imageUrl", label: "Photo URL", type: "url", placeholder: "https://..." },
      { key: "linkedin", label: "LinkedIn URL", type: "url", placeholder: "https://..." },
      { key: "instagram", label: "Instagram URL", type: "url", placeholder: "https://..." }
    ]
  }
};

const adminNav = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "settings", label: "Website Settings", icon: Settings },
  { key: "services", label: "Services", icon: Search },
  { key: "projects", label: "Projects / Work", icon: BarChart3 },
  { key: "packages", label: "Packages", icon: FileText },
  { key: "videos", label: "Videos", icon: FileText },
  { key: "insights", label: "Insights", icon: FileText },
  { key: "faqs", label: "FAQs", icon: CheckCircle2 },
  { key: "statistics", label: "Statistics", icon: BarChart3 },
  { key: "testimonials", label: "Testimonials", icon: CheckCircle2 },
  { key: "team", label: "Team", icon: LayoutDashboard },
  { key: "enquiries", label: "Contacts / Enquiries", icon: Mail },
  { key: "seo", label: "SEO Settings", icon: Search },
  { key: "media", label: "Media", icon: ImageUp }
];
