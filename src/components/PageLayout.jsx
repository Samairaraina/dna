import Breadcrumbs from "./Breadcrumbs";

const pageMeta = {
  "/": {
    title: "Home",
    description: "Overview",
    gradient: "from-crispr-400 via-aqua-400 to-yellow-400",
  },
  "/research": {
    title: "Research",
    description: "Explore our CRISPR optimization research",
    gradient: "from-crispr-400 to-emerald-400",
  },
  "/dashboard": {
    title: "Dashboard",
    description: "Real-time performance metrics",
    gradient: "from-aqua-400 to-cyan-500",
  },
  "/publications": {
    title: "Publications",
    description: "Peer-reviewed research & papers",
    gradient: "from-yellow-400 to-amber-500",
  },
  "/team": {
    title: "Team",
    description: "Meet the researchers",
    gradient: "from-purple-400 to-violet-500",
  },
  "/contact": {
    title: "Contact",
    description: "Get in touch",
    gradient: "from-rose-400 to-pink-500",
  },
};

export default function PageLayout({ path, children, noBreadcrumbs, fullWidth }) {
  const meta = pageMeta[path] || { title: "", description: "", gradient: "from-crispr-400 to-aqua-400" };

  if (fullWidth) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <main className="min-h-screen">
      <div className="px-6 lg:px-10 py-6">
        {!noBreadcrumbs && <Breadcrumbs />}
        <div className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${meta.gradient}`}>
            {meta.title}
          </h1>
          {meta.description && (
            <p className="mt-1.5 text-gray-500 dark:text-gray-400 text-sm">{meta.description}</p>
          )}
        </div>
        {children}
      </div>
    </main>
  );
}
