import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-flex items-center gap-2 font-display font-bold text-lg ${className}`}>
    <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-soft">
      <Sparkles className="h-4 w-4 text-primary-foreground" />
    </span>
    <span className="tracking-tight">Stratifyr</span>
  </Link>
);
