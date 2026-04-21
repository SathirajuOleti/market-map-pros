export type Channel =
  | "Instagram"
  | "Google Ads"
  | "Facebook"
  | "TikTok"
  | "Email"
  | "SEO"
  | "Offline"
  | "Other";

export const CHANNELS: Channel[] = [
  "Instagram",
  "Google Ads",
  "Facebook",
  "TikTok",
  "Email",
  "SEO",
  "Offline",
  "Other",
];

export interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  budget: number;
  startDate: string;
  endDate: string;
  clicks: number;
  leads: number;
  revenue: number;
}

export interface Business {
  name: string;
  industry: string;
  monthlyBudget: number;
}

export interface User {
  name: string;
  email: string;
}
