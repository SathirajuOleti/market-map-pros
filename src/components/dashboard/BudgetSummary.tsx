import { Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { Campaign } from "@/lib/types";

export const BudgetSummary = ({
  monthlyBudget,
  campaigns,
}: {
  monthlyBudget: number;
  campaigns: Campaign[];
}) => {
  const allocated = campaigns.reduce((s, c) => s + (c.budget || 0), 0);
  const remaining = Math.max(monthlyBudget - allocated, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + (c.revenue || 0), 0);
  const pct = monthlyBudget > 0 ? Math.min((allocated / monthlyBudget) * 100, 100) : 0;

  // Channel breakdown
  const byChannel = campaigns.reduce<Record<string, number>>((acc, c) => {
    acc[c.channel] = (acc[c.channel] || 0) + (c.budget || 0);
    return acc;
  }, {});
  const channels = Object.entries(byChannel).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Stat label="Monthly Budget" value={formatCurrency(monthlyBudget)} tone="primary" icon={<Wallet className="h-4 w-4" />} />
      <Stat label="Allocated" value={formatCurrency(allocated)} sub={`${pct.toFixed(0)}% of budget`} />
      <Stat label="Remaining" value={formatCurrency(remaining)} />
      <Stat label="Tracked Revenue" value={formatCurrency(totalRevenue)} />

      <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Budget allocation</span>
          <span className="text-muted-foreground">{formatCurrency(allocated)} / {formatCurrency(monthlyBudget)}</span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
        </div>

        {channels.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(([name, val]) => {
              const p = monthlyBudget > 0 ? (val / monthlyBudget) * 100 : 0;
              return (
                <div key={name} className="rounded-xl bg-muted/60 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{name}</span>
                    <span className="font-medium">{formatCurrency(val)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                    <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No campaigns yet — add one to start tracking allocation.</p>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value, sub, icon, tone }: { label: string; value: string; sub?: string; icon?: React.ReactNode; tone?: "primary" }) => (
  <div className={`rounded-2xl border p-5 ${tone === "primary" ? "border-transparent bg-gradient-primary text-primary-foreground shadow-elegant" : "border-border bg-card"}`}>
    <div className={`flex items-center gap-2 text-xs ${tone === "primary" ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-2 font-display text-2xl font-bold">{value}</div>
    {sub && <div className={`mt-1 text-xs ${tone === "primary" ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{sub}</div>}
  </div>
);
