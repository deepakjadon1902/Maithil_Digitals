import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { BrandIntro } from "./components/BrandIntro";
import { Navbar } from "./components/Navbar";
import { PageTransition } from "./components/PageTransition";
import { LoadingState } from "./components/State";
import { useContent } from "./hooks/useContent";
import { useMotionInteractions } from "./hooks/useMotionInteractions";
import { useScrollReveal } from "./hooks/useScrollReveal";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Services = lazy(() => import("./pages/Services").then((module) => ({ default: module.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then((module) => ({ default: module.ServiceDetail })));
const Work = lazy(() => import("./pages/Work").then((module) => ({ default: module.Work })));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then((module) => ({ default: module.ProjectDetail })));
const Packages = lazy(() => import("./pages/Packages").then((module) => ({ default: module.Packages })));
const PackagePlanDetail = lazy(() => import("./pages/PackageDetail").then((module) => ({ default: module.PackagePlanDetail })));
const PackageCategoryDetail = lazy(() => import("./pages/PackageDetail").then((module) => ({ default: module.PackageCategoryDetail })));
const Videos = lazy(() => import("./pages/Videos").then((module) => ({ default: module.Videos })));
const VideoDetail = lazy(() => import("./pages/VideoDetail").then((module) => ({ default: module.VideoDetail })));
const Insights = lazy(() => import("./pages/Insights").then((module) => ({ default: module.Insights })));
const InsightDetail = lazy(() => import("./pages/InsightDetail").then((module) => ({ default: module.InsightDetail })));
const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));
const PrivacyPolicy = lazy(() => import("./pages/Legal").then((module) => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import("./pages/Legal").then((module) => ({ default: module.TermsAndConditions })));
const ControlPanel = lazy(() => import("./pages/ControlPanel").then((module) => ({ default: module.ControlPanel })));
const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { settings } = useContent();
  useScrollReveal();
  useMotionInteractions();

  return (
    <>
      {!isAdminRoute ? <BrandIntro settings={settings} /> : null}
      {!isAdminRoute ? <Navbar settings={settings} /> : null}
      <Suspense fallback={<div className="min-h-screen bg-ink p-8 pt-32 text-white"><LoadingState /></div>}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/plan/:slug" element={<PackagePlanDetail />} />
            <Route path="/packages/category/:slug" element={<PackageCategoryDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:slug" element={<VideoDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/admin/login" element={<ControlPanel />} />
            <Route path="/admin/dashboard" element={<ControlPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
      {!isAdminRoute ? <Footer settings={settings} /> : null}
    </>
  );
}
