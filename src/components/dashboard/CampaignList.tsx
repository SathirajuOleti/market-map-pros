import { useState } from "react";
import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Campaign } from "@/lib/types";
import { calcRoi, formatCurrency, formatNumber } from "@/lib/format";
import { CampaignDialog } from "./CampaignDialog";

interface Props {
  campaigns: Campaign[];
  onUpdate: (c: Campaign) => void;
  onDelete: (id: string) => void;
}

export const CampaignList = ({ campaigns, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [metricsFor, setMetricsFor] = useState<Campaign | null>(null);

  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
        <p className="font-display text-lg font-semibold">No campaigns yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Create your first campaign to start tracking your marketing.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.4fr,1fr,1fr,1.4fr,1fr,auto] gap-4 px-5 py-3 text-xs font-medium text-muted-foreground bg-muted/40 border-b border-border">
          <span>Campaign</span><span>Channel</span><span>Budget</span><span>Dates</span><span>ROI</span><span></span>
        </div>
        <ul className="divide-y divide-border">
          {campaigns.map((c) => {
            const roi = calcRoi(c.revenue, c.budget);
            const positive = roi >= 0;
            return (
              <li key={c.id} className="grid md:grid-cols-[1.4fr,1fr,1fr,1.4fr,1fr,auto] gap-4 px-5 py-4 items-center">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="md:hidden text-xs text-muted-foreground mt-0.5">
                    {c.channel} · {formatCurrency(c.budget)}
                  </div>
                </div>
                <div className="hidden md:block text-sm">
                  <span className="rounded-full bg-accent text-accent-foreground px-2.5 py-0.5 text-xs font-medium">{c.channel}</span>
                </div>
                <div className="hidden md:block text-sm">{formatCurrency(c.budget)}</div>
                <div className="hidden md:block text-xs text-muted-foreground">{c.startDate} → {c.endDate}</div>
                <div className="text-sm">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {roi.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setMetricsFor(c)}>Metrics</Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditing(c)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(c.id)} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {editing && (
        <CampaignDialog
          initial={editing}
          open={!!editing}
          onOpenChange={(o) => !o && setEditing(null)}
          onSave={(c) => { onUpdate(c); setEditing(null); }}
        />
      )}

      <MetricsDialog
        campaign={metricsFor}
        onClose={() => setMetricsFor(null)}
        onSave={(c) => { onUpdate(c); setMetricsFor(null); }}
      />
    </>
  );
};

const MetricsDialog = ({ campaign, onClose, onSave }: { campaign: Campaign | null; onClose: () => void; onSave: (c: Campaign) => void }) => {
  const [clicks, setClicks] = useState("");
  const [leads, setLeads] = useState("");
  const [revenue, setRevenue] = useState("");

  // Sync when campaign changes
  if (campaign && clicks === "" && leads === "" && revenue === "") {
    // initialize once
  }

  const open = !!campaign;
  const handleOpen = (o: boolean) => {
    if (!o) { onClose(); setClicks(""); setLeads(""); setRevenue(""); }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{campaign?.name} — performance</DialogTitle>
        </DialogHeader>
        {campaign && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-2">
              <Stat label="Clicks" value={formatNumber(campaign.clicks)} />
              <Stat label="Leads" value={formatNumber(campaign.leads)} />
              <Stat label="Revenue" value={formatCurrency(campaign.revenue)} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5"><Label>Clicks</Label><Input type="number" min={0} value={clicks} onChange={(e) => setClicks(e.target.value)} placeholder={String(campaign.clicks)} /></div>
              <div className="space-y-1.5"><Label>Leads</Label><Input type="number" min={0} value={leads} onChange={(e) => setLeads(e.target.value)} placeholder={String(campaign.leads)} /></div>
              <div className="space-y-1.5"><Label>Revenue</Label><Input type="number" min={0} value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder={String(campaign.revenue)} /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => handleOpen(false)}>Cancel</Button>
              <Button
                variant="hero"
                onClick={() => {
                  onSave({
                    ...campaign,
                    clicks: clicks ? Number(clicks) : campaign.clicks,
                    leads: leads ? Number(leads) : campaign.leads,
                    revenue: revenue ? Number(revenue) : campaign.revenue,
                  });
                  setClicks(""); setLeads(""); setRevenue("");
                }}
              >Save metrics</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-muted/60 p-3 text-center">
    <div className="text-[11px] text-muted-foreground">{label}</div>
    <div className="font-display font-semibold">{value}</div>
  </div>
);
