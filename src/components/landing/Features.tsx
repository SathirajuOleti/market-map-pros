import { Wallet, CalendarRange, LineChart } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Budget Planner",
    desc: "Set a monthly marketing budget and split it across channels — Instagram, Google Ads, Offline, and more.",
  },
  {
    icon: CalendarRange,
    title: "Campaign Scheduler",
    desc: "Plan campaigns with names, channels, budgets, and start/end dates. See everything in one calendar.",
  },
  {
    icon: LineChart,
    title: "Performance Tracker",
    desc: "Log clicks, leads, and revenue. Get instant ROI per campaign — no spreadsheet wizardry needed.",
  },
];

export const Features = () => (
  <section id="features" className="py-20 lg:py-28">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <span className="text-sm font-medium text-primary">Features</span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Everything you need, nothing you don't</h2>
        <p className="mt-3 text-muted-foreground">
          Three tools that work together to give you a clear marketing picture from day one.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
