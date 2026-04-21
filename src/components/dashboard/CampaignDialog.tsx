import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Campaign, CHANNELS, Channel } from "@/lib/types";
import { toast } from "sonner";

interface Props {
  initial?: Campaign | null;
  trigger?: React.ReactNode;
  onSave: (c: Campaign) => void;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
}

export const CampaignDialog = ({ initial, trigger, onSave, open, onOpenChange }: Props) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [name, setName] = useState(initial?.name ?? "");
  const [channel, setChannel] = useState<Channel>(initial?.channel ?? "Instagram");
  const [budget, setBudget] = useState<string>(initial?.budget?.toString() ?? "");
  const [startDate, setStartDate] = useState(initial?.startDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");

  const reset = () => {
    setName(initial?.name ?? "");
    setChannel(initial?.channel ?? "Instagram");
    setBudget(initial?.budget?.toString() ?? "");
    setStartDate(initial?.startDate ?? "");
    setEndDate(initial?.endDate ?? "");
  };

  const submit = () => {
    if (!name.trim() || !budget || !startDate || !endDate) {
      toast.error("Please complete all fields");
      return;
    }
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      channel,
      budget: Number(budget),
      startDate,
      endDate,
      clicks: initial?.clicks ?? 0,
      leads: initial?.leads ?? 0,
      revenue: initial?.revenue ?? 0,
    });
    setOpen(false);
    if (!initial) reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit campaign" : "New campaign"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Spring Launch" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Channel</Label>
              <Select value={channel} onValueChange={(v) => setChannel(v as Channel)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CHANNELS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Budget ($)</Label>
              <Input type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Start date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>End date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="hero" onClick={submit}>{initial ? "Save changes" : "Create campaign"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const NewCampaignButton = ({ onSave }: { onSave: (c: Campaign) => void }) => (
  <CampaignDialog
    onSave={onSave}
    trigger={
      <Button variant="hero">
        <Plus /> New campaign
      </Button>
    }
  />
);
