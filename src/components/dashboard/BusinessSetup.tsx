import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Business } from "@/lib/types";
import { Sparkles } from "lucide-react";

export const BusinessSetup = ({ onSave }: { onSave: (b: Business) => void }) => {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !industry || !budget) return;
    onSave({ name, industry, monthlyBudget: Number(budget) });
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-border bg-gradient-card p-7 shadow-soft">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">Set up your business</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tell us a bit about your business to personalize your dashboard.</p>
        <div className="mt-5 space-y-3">
          <div className="space-y-1.5"><Label>Business name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Co." /></div>
          <div className="space-y-1.5"><Label>Industry</Label><Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="E-commerce, SaaS, Coaching..." /></div>
          <div className="space-y-1.5"><Label>Monthly marketing budget ($)</Label><Input type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2000" /></div>
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full mt-5">Continue</Button>
      </form>
    </div>
  );
};
