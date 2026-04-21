import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Megaphone, BarChart3, Settings, LogOut, Wallet, Plus } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { storage } from "@/lib/storage";
import { Business, Campaign, User } from "@/lib/types";
import { BudgetSummary } from "@/components/dashboard/BudgetSummary";
import { CampaignList } from "@/components/dashboard/CampaignList";
import { NewCampaignButton } from "@/components/dashboard/CampaignDialog";
import { BusinessSetup } from "@/components/dashboard/BusinessSetup";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => storage.getUser());
  const [business, setBusiness] = useState<Business | null>(() => storage.getBusiness());
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => storage.getCampaigns());
  const [view, setView] = useState<"overview" | "campaigns" | "performance">("overview");

  useEffect(() => {
    document.title = "Dashboard — Stratifyr";
    if (!user) navigate("/auth");
  }, [user, navigate]);

  useEffect(() => storage.setCampaigns(campaigns), [campaigns]);

  const saveCampaign = (c: Campaign) => {
    setCampaigns((prev) => {
      const exists = prev.find((p) => p.id === c.id);
      const next = exists ? prev.map((p) => (p.id === c.id ? c : p)) : [c, ...prev];
      return next;
    });
    toast.success("Campaign saved");
  };
  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((p) => p.id !== id));
    toast.success("Campaign deleted");
  };

  const logout = () => {
    storage.setUser(null);
    setUser(null);
    navigate("/");
  };

  const performance = useMemo(() => {
    const clicks = campaigns.reduce((s, c) => s + c.clicks, 0);
    const leads = campaigns.reduce((s, c) => s + c.leads, 0);
    const revenue = campaigns.reduce((s, c) => s + c.revenue, 0);
    const spent = campaigns.reduce((s, c) => s + c.budget, 0);
    return { clicks, leads, revenue, spent };
  }, [campaigns]);

  if (!user) return null;

  if (!business) {
    return (
      <DashboardShell user={user} onLogout={logout} view={view} setView={setView} business={null}>
        <BusinessSetup onSave={(b) => { storage.setBusiness(b); setBusiness(b); toast.success("Business profile saved"); }} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell user={user} onLogout={logout} view={view} setView={setView} business={business} onUpdateBusiness={(b) => { storage.setBusiness(b); setBusiness(b); }}>
      {view === "overview" && (
        <div className="space-y-6">
          <PageHeader title={`Welcome back, ${user.name}`} subtitle={`Here's how ${business.name} is doing this month.`} action={<NewCampaignButton onSave={saveCampaign} />} />
          <BudgetSummary monthlyBudget={business.monthlyBudget} campaigns={campaigns} />
          <section>
            <h3 className="font-display text-lg font-semibold mb-3">Recent campaigns</h3>
            <CampaignList campaigns={campaigns.slice(0, 5)} onUpdate={saveCampaign} onDelete={deleteCampaign} />
          </section>
        </div>
      )}

      {view === "campaigns" && (
        <div className="space-y-6">
          <PageHeader title="Campaigns" subtitle="Create, edit, and track all your marketing campaigns." action={<NewCampaignButton onSave={saveCampaign} />} />
          <CampaignList campaigns={campaigns} onUpdate={saveCampaign} onDelete={deleteCampaign} />
        </div>
      )}

      {view === "performance" && (
        <div className="space-y-6">
          <PageHeader title="Performance" subtitle="A snapshot of your overall marketing performance." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Total spent" value={`$${performance.spent.toLocaleString()}`} />
            <Metric label="Total clicks" value={performance.clicks.toLocaleString()} />
            <Metric label="Total leads" value={performance.leads.toLocaleString()} />
            <Metric label="Total revenue" value={`$${performance.revenue.toLocaleString()}`} tone="primary" />
          </div>
          <CampaignList campaigns={campaigns} onUpdate={saveCampaign} onDelete={deleteCampaign} />
        </div>
      )}
    </DashboardShell>
  );
};

const Metric = ({ label, value, tone }: { label: string; value: string; tone?: "primary" }) => (
  <div className={`rounded-2xl border p-5 ${tone === "primary" ? "border-transparent bg-gradient-primary text-primary-foreground shadow-elegant" : "border-border bg-card"}`}>
    <div className={`text-xs ${tone === "primary" ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{label}</div>
    <div className="mt-2 font-display text-2xl font-bold">{value}</div>
  </div>
);

const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const NAV = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "campaigns" as const, label: "Campaigns", icon: Megaphone },
  { id: "performance" as const, label: "Performance", icon: BarChart3 },
];

const DashboardShell = ({
  user,
  onLogout,
  view,
  setView,
  business,
  onUpdateBusiness,
  children,
}: {
  user: User;
  onLogout: () => void;
  view: "overview" | "campaigns" | "performance";
  setView: (v: "overview" | "campaigns" | "performance") => void;
  business: Business | null;
  onUpdateBusiness?: (b: Business) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="px-5 py-5"><Logo /></div>
        <nav className="px-3 space-y-1">
          {NAV.map((n) => {
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </button>
            );
          })}
        </nav>

        {business && onUpdateBusiness && (
          <div className="mt-auto p-4 space-y-3">
            <BusinessCard business={business} onSave={onUpdateBusiness} />
            <button onClick={onLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-2">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        )}
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-3">
            <div className="lg:hidden"><Logo /></div>
            <div className="hidden lg:block text-sm text-muted-foreground">
              {business ? <>You're viewing <span className="text-foreground font-medium">{business.name}</span></> : "Set up your business to begin"}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:flex h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground items-center justify-center text-sm font-semibold shadow-soft">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          {/* Mobile nav */}
          <div className="lg:hidden border-t border-border">
            <div className="flex">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setView(n.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs ${view === n.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

const BusinessCard = ({ business, onSave }: { business: Business; onSave: (b: Business) => void }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(business.name);
  const [industry, setIndustry] = useState(business.industry);
  const [budget, setBudget] = useState(String(business.monthlyBudget));

  return (
    <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5" /> Business</div>
      <div className="mt-1 font-medium text-sm">{business.name}</div>
      <div className="text-xs text-muted-foreground">{business.industry}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="mt-2 w-full justify-start"><Settings className="h-4 w-4" /> Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Business profile</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>Business name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Industry</Label><Input value={industry} onChange={(e) => setIndustry(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Monthly budget ($)</Label><Input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="hero" onClick={() => { onSave({ name, industry, monthlyBudget: Number(budget) }); setOpen(false); toast.success("Saved"); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
