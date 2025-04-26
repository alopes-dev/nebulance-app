export const TRANSACTIONS_ICONS_MAPS = [
  {
    category: "FOOD",
    icon: "basket",
  },
  {
    category: "FOOD",
    icon: "cash",
  },
  {
    category: "ENTERTAINMENT",
    icon: "film",
  },
  {
    category: "TRANSPORT",
    icon: "car",
  },
  {
    category: "SHOPPING",
    icon: "cart",
  },
  {
    category: "FOOD",
    icon: "cash",
  },
  {
    category: "UTILITIES",
    icon: "flash",
  },
  {
    category: "HEALTHCARE",
    icon: "fitness",
  },
];

export const CATEGORY_ITEMS = [
  { label: "Food", value: "FOOD" },
  { label: "Transport", value: "TRANSPORT" },
  { label: "Entertainment", value: "ENTERTAINMENT" },
  { label: "Shopping", value: "SHOPPING" },
  { label: "Utilities", value: "UTILITIES" },
  { label: "Healthcare", value: "HEALTHCARE" },
];

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
