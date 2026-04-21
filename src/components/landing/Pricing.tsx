import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    tagline: "For solo founders getting started.",
    features: ["1 business profile", "Up to 3 active campaigns", "Basic ROI tracking"],
    cta: "Start Free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$19",
    tagline: "For growing small businesses.",
    features: ["Unlimited campaigns", "All channels", "Advanced ROI insights", "Email support"],
    cta: "Try Pro",
    highlight: true,
    variant: "hero" as const,
  },
  {
    name: "Premium",
    price: "$49",
    tagline: "For teams and agencies.",
    features: ["Multiple businesses", "Team collaboration", "Custom reports", "Priority support"],
    cta: "Go Premium",
    variant: "outline" as const,
  },
];

export const Pricing = () => (
  <section id="pricing" className="py-20 lg:py-28">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <span className="text-sm font-medium text-primary">Pricing</span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Simple plans that grow with you</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl border p-7 shadow-soft transition-all ${
              t.highlight
                ? "border-primary/40 bg-gradient-card shadow-elegant scale-[1.02]"
                : "border-border bg-card"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-soft">
                Most popular
              </span>
            )}
            <div className="font-display text-lg font-semibold">{t.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">{t.price}</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.tagline}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-success shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant={t.variant} className="w-full mt-7" size="lg">
              <Link to="/auth?mode=signup">{t.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
