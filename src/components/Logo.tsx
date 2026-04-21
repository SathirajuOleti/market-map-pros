import { Link } from "react-router-dom";
import logo from "@/assets/stratifyr-logo.jpg";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-flex items-center gap-2.5 font-display font-bold text-lg ${className}`}>
    <img
      src={logo}
      alt="Stratifyr logo"
      className="h-9 w-9 rounded-xl object-cover shadow-soft"
    />
    <span className="tracking-tight">Stratifyr</span>
  </Link>
);
