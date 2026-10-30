/**
 * Mock seed data for Aura Wealth.
 * Used to populate the dashboard on first load so the app looks active out of the box.
 */
import { Category, SavingsGoal, Account, Transaction } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Groceries", color: "#10B981", icon: "ShoppingCart", type: "expense", budget: 400 },
  { id: "cat-2", name: "Dining", color: "#F59E0B", icon: "Utensils", type: "expense", budget: 200 },
  { id: "cat-3", name: "Transport", color: "#3B82F6", icon: "Car", type: "expense", budget: 150 },
  { id: "cat-4", name: "Utilities", color: "#8B5CF6", icon: "Zap", type: "expense", budget: 120 },
  { id: "cat-5", name: "Entertainment", color: "#EC4899", icon: "Film", type: "expense", budget: 100 },
  { id: "cat-6", name: "Health", color: "#14B8A6", icon: "Heart", type: "expense", budget: 80 },
  { id: "cat-7", name: "Salary", color: "#22C55E", icon: "Briefcase", type: "income" },
  { id: "cat-8", name: "Freelance", color: "#06B6D4", icon: "Laptop", type: "income" },
  { id: "cat-9", name: "Investments", color: "#8B5CF6", icon: "TrendingUp", type: "income" },
  { id: "cat-10", name: "Gifts", color: "#F43F5E", icon: "Gift", type: "income" },
];

export const MOCK_ACCOUNTS: Account[] = [
  { id: "acc-1", name: "Checking", type: "checking", balance: 4320.5, color: "#3B82F6" },
  { id: "acc-2", name: "Savings", type: "savings", balance: 12450.0, color: "#22C55E" },
  { id: "acc-3", name: "Investments", type: "investment", balance: 28100.0, color: "#8B5CF6" },
  { id: "acc-4", name: "Credit Card", type: "credit", balance: -1240.3, color: "#F43F5E" },
];

export const MOCK_GOALS: SavingsGoal[] = [
  {
    id: "goal-1",
    name: "Emergency Fund",
    target: 10000,
    current: 6420,
    icon: "Shield",
    color: "#22C55E",
    deadline: "2025-12-31",
    milestoneAlerts: [25, 50, 75, 100],
  },
  {
    id: "goal-2",
    name: "New Laptop",
    target: 2200,
    current: 1150,
    icon: "Laptop",
    color: "#3B82F6",
    deadline: "2025-06-15",
    milestoneAlerts: [25, 50, 75, 100],
  },
  {
    id: "goal-3",
    name: "Vacation Fund",
    target: 5000,
    current: 2300,
    icon: "Plane",
    color: "#06B6D4",
    deadline: "2025-09-01",
    milestoneAlerts: [25, 50, 75, 100],
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    amount: 4200,
    type: "income",
    category: "Salary",
    categoryId: "cat-7",
    description: "Monthly salary",
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    note: "Direct deposit",
  },
  {
    id: "tx-2",
    amount: 45,
    type: "expense",
    category: "Groceries",
    categoryId: "cat-1",
    description: "Whole Foods Market",
    date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
    note: "Weekly grocery run",
  },
  {
    id: "tx-3",
    amount: 18.5,
    type: "expense",
    category: "Dining",
    categoryId: "cat-2",
    description: "Café Latte",
    date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-4",
    amount: 32,
    type: "expense",
    category: "Transport",
    categoryId: "cat-3",
    description: "Uber ride",
    date: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-5",
    amount: 89.99,
    type: "expense",
    category: "Utilities",
    categoryId: "cat-4",
    description: "Internet bill",
    date: new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-6",
    amount: 1200,
    type: "income",
    category: "Freelance",
    categoryId: "cat-8",
    description: "Website project",
    date: new Date(Date.now() - 8 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-7",
    amount: 25,
    type: "expense",
    category: "Entertainment",
    categoryId: "cat-5",
    description: "Streaming subscription",
    date: new Date(Date.now() - 9 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-8",
    amount: 60,
    type: "expense",
    category: "Health",
    categoryId: "cat-6",
    description: "Pharmacy",
    date: new Date(Date.now() - 10 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-9",
    amount: 500,
    type: "income",
    category: "Investments",
    categoryId: "cat-9",
    description: "Dividend payout",
    date: new Date(Date.now() - 12 * 86400000).toISOString().split("T")[0],
  },
  {
    id: "tx-10",
    amount: 34.99,
    type: "expense",
    category: "Groceries",
    categoryId: "cat-1",
    description: "Trader Joe's",
    date: new Date(Date.now() - 13 * 86400000).toISOString().split("T")[0],
  },
];

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
