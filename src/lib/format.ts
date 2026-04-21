export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(isFinite(n) ? n : 0);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(isFinite(n) ? n : 0);

export const calcRoi = (revenue: number, budget: number) => {
  if (!budget) return 0;
  return ((revenue - budget) / budget) * 100;
};
