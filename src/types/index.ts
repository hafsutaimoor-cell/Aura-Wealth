export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: TransactionType;
  budget?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  categoryId: string;
  description: string;
  date: string; // ISO date string
  note?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
  deadline?: string;
  milestoneAlerts: number[]; // percentages (e.g. [25, 50, 75, 100])
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  color: string;
}

export interface DashboardStats {
  netWorth: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  savingsRate: number;
}

export interface VoiceCommand {
  id: string;
  text: string;
  status: "listening" | "processing" | "success" | "error";
  parsed?: {
    type: TransactionType;
    amount: number;
    category: string;
    description: string;
  };
  timestamp: string;
}

export interface SpendingPoint {
  date: string;
  amount: number;
  type: TransactionType;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}

export interface NavItem {
  title: string;
  url: string;
  icon: string;
  label?: string;
}