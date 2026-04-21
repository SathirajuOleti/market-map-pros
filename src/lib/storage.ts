import { Business, Campaign, User } from "./types";

const K = {
  user: "stratifyr.user",
  business: "stratifyr.business",
  campaigns: "stratifyr.campaigns",
  theme: "stratifyr.theme",
};

export const storage = {
  getUser: (): User | null => {
    try { return JSON.parse(localStorage.getItem(K.user) || "null"); } catch { return null; }
  },
  setUser: (u: User | null) => {
    if (u) localStorage.setItem(K.user, JSON.stringify(u));
    else localStorage.removeItem(K.user);
  },
  getBusiness: (): Business | null => {
    try { return JSON.parse(localStorage.getItem(K.business) || "null"); } catch { return null; }
  },
  setBusiness: (b: Business) => localStorage.setItem(K.business, JSON.stringify(b)),
  getCampaigns: (): Campaign[] => {
    try { return JSON.parse(localStorage.getItem(K.campaigns) || "[]"); } catch { return []; }
  },
  setCampaigns: (c: Campaign[]) => localStorage.setItem(K.campaigns, JSON.stringify(c)),
  getTheme: (): "light" | "dark" =>
    (localStorage.getItem(K.theme) as "light" | "dark") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  setTheme: (t: "light" | "dark") => localStorage.setItem(K.theme, t),
};
