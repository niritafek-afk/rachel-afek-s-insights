import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-border/70 bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
        <Link to="/" className="group">
          <h1 className="font-serif text-2xl md:text-3xl text-primary tracking-tight leading-none">
            רחל אפק
          </h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-wide">
            כתיבה, מחשבה, ספק
          </p>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2 text-sm">
          <NavLink to="/">בית</NavLink>
          <NavLink to="/blog">ארכיון</NavLink>
          <NavLink to="/about">אודות</NavLink>
          <NavLink to="/contact">צרו קשר</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md text-foreground/80 hover:text-primary hover:bg-accent/60 transition-colors"
      activeProps={{ className: "text-primary font-medium" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/70 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg text-primary">רחל אפק</p>
          <p className="text-sm text-muted-foreground mt-1">
            מגזין אישי – דעות, מאמרים, מחשבות שניות.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="mailto:rchlafek@gmail.com"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            rchlafek@gmail.com
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
