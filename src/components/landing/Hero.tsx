import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Wallet, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-28">
        <div className="space-y-7 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Marketing planning, simplified
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Turn marketing chaos into a <span className="text-gradient">clear, budget-driven plan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Stratifyr helps small businesses set budgets, schedule campaigns, and measure ROI — without the
            spreadsheet mess. Built for founders who want clarity, not complexity.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth?mode=signup">
                Start Free <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#features">See features</a>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span>✦ No credit card</span>
            <span>✦ 2-minute setup</span>
          </div>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
};

const DashboardMock = () => (
  <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
    <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-[3rem]" />
    <div className="relative rounded-3xl border border-border bg-gradient-card p-5 shadow-elegant">
      <div className="flex items-center gap-1.5 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        <span className="ml-3 text-xs text-muted-foreground">app.stratifyr.com/dashboard</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MockStat icon={<Wallet className="h-4 w-4" />} label="Budget" value="$8,400" tone="primary" />
        <MockStat icon={<BarChart3 className="h-4 w-4" />} label="Spent" value="$5,210" />
        <MockStat icon={<Calendar className="h-4 w-4" />} label="Active" value="6" />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Allocation</span>
          <span>This month</span>
        </div>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-secondary">
          <span className="h-full w-[38%] bg-gradient-primary" />
          <span className="h-full w-[24%] bg-primary/60" />
          <span className="h-full w-[18%] bg-primary/40" />
          <span className="h-full w-[12%] bg-primary/25" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {[
            ["Instagram", "$3,192"],
            ["Google Ads", "$2,016"],
            ["Email", "$1,512"],
            ["SEO", "$1,008"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-1.5">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Spring Launch</span>
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">+184% ROI</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div>1,240 clicks</div><div>86 leads</div><div>$2,840 rev</div>
        </div>
      </div>
    </div>
  </div>
);

const MockStat = ({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: "primary" }) => (
  <div className={`rounded-2xl border border-border p-3 ${tone === "primary" ? "bg-gradient-primary text-primary-foreground" : "bg-card"}`}>
    <div className={`flex items-center gap-1.5 text-xs ${tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      {icon}{label}
    </div>
    <div className="mt-1 font-display text-xl font-semibold">{value}</div>
  </div>
);
