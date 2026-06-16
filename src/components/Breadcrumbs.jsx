import { Link, useLocation } from "react-router-dom";

const labels = {
  "/": "Home",
  "/research": "Research",
  "/dashboard": "Dashboard",
  "/publications": "Publications",
  "/team": "Team",
  "/contact": "Contact",
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <Link to="/" className="hover:text-aqua-400 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>
      {segments.map((seg, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <span key={path} className="flex items-center gap-2">
            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {isLast ? (
              <span className="text-white font-medium">{labels[path] || seg}</span>
            ) : (
              <Link to={path} className="hover:text-aqua-400 transition-colors">{labels[path] || seg}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
