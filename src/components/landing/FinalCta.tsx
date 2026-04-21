import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCta = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 sm:p-14 text-center shadow-elegant">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent_60%)] opacity-20" />
        <h2 className="relative font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
          Ready to plan smarter marketing?
        </h2>
        <p className="relative mt-3 max-w-xl mx-auto text-primary-foreground/85">
          Join founders using Stratifyr to bring structure to every dollar they spend.
        </p>
        <Button asChild size="xl" className="relative mt-7 bg-background text-foreground hover:bg-background/90">
          <Link to="/auth?mode=signup">
            Start Free <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
