import { Logo } from "./Logo";

export const SiteFooter = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <Logo />
      <p>© {new Date().getFullYear()} Stratifyr. Plan smart, spend smarter.</p>
    </div>
  </footer>
);
