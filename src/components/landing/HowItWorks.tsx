const steps = [
  { n: "01", title: "Set your budget", desc: "Enter your monthly marketing budget and pick the channels you care about." },
  { n: "02", title: "Schedule campaigns", desc: "Add campaigns with dates and budgets. Stay organized at a glance." },
  { n: "03", title: "Track ROI", desc: "Log results as they come in. Stratifyr calculates ROI automatically." },
];

export const HowItWorks = () => (
  <section id="how" className="py-20 lg:py-28 bg-secondary/40 border-y border-border">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <span className="text-sm font-medium text-primary">How it works</span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">From chaos to clarity in 3 steps</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-5xl font-bold text-gradient leading-none">{s.n}</div>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
