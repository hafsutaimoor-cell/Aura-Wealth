"use client";

import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/types";

const CATEGORY_KEYWORDS: Record<string, { category: string; type: "income" | "expense" }> = {
  grocery: { category: "Groceries", type: "expense" },
  food: { category: "Groceries", type: "expense" },
  cafe: { category: "Dining", type: "expense" },
  dining: { category: "Dining", type: "expense" },
  restaurant: { category: "Dining", type: "expense" },
  uber: { category: "Transport", type: "expense" },
  transport: { category: "Transport", type: "expense" },
  gas: { category: "Transport", type: "expense" },
  fuel: { category: "Transport", type: "expense" },
  utility: { category: "Utilities", type: "expense" },
  internet: { category: "Utilities", type: "expense" },
  bill: { category: "Utilities", type: "expense" },
  movie: { category: "Entertainment", type: "expense" },
  stream: { category: "Entertainment", type: "expense" },
  entertainment: { category: "Entertainment", type: "expense" },
  pharmacy: { category: "Health", type: "expense" },
  health: { category: "Health", type: "expense" },
  salary: { category: "Salary", type: "income" },
  paycheck: { category: "Salary", type: "income" },
  freelance: { category: "Freelance", type: "income" },
  project: { category: "Freelance", type: "income" },
  dividend: { category: "Investments", type: "income" },
  investment: { category: "Investments", type: "income" },
  gift: { category: "Gifts", type: "income" },
};

const AMOUNT_REGEX = /\$?\s*(\d+(?:\.\d{1,2})?)/;

export function parseVoiceCommand(text: string) {
  const lower = text.toLowerCase().trim();
  const amountMatch = lower.match(AMOUNT_REGEX);
  const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;

  let matched: { category: string; type: "income" | "expense" } | null = null;
  for (const [kw, info] of Object.entries(CATEGORY_KEYWORDS)) {
    if (lower.includes(kw)) {
      matched = info;
      break;
    }
  }

  const isExpense = /spent|paid|bought|cost|purchase/i.test(lower);
  const isIncome = /earned|received|got paid|deposit/i.test(lower);

  let type = matched?.type;
  if (isExpense && !isIncome) type = "expense";
  if (isIncome && !isExpense) type = "income";

  const category = matched?.category || "Uncategorized";
  const description = type === "income"
    ? `Voice-logged income: ${text}`
    : `Voice-logged expense: ${text}`;

  return {
    text,
    amount,
    type: type || "expense",
    category,
    description,
    confidence: amount > 0 && matched ? 0.92 : 0.6,
  };
}

export function executeVoiceCommand(text: string) {
  const parsed = parseVoiceCommand(text);
  const store = useFinanceStore.getState();

  if (parsed.amount <= 0) {
    store.addVoiceCommand({
      text,
      status: "error",
      timestamp: new Date().toISOString(),
    });
    return { success: false, parsed, error: "No amount detected" };
  }

  const transaction: Omit<Transaction, "id"> = {
    amount: parsed.amount,
    type: parsed.type,
    category: parsed.category,
    categoryId: parsed.category,
    description: parsed.description,
    date: new Date().toISOString().split("T")[0],
  };

  store.addTransaction(transaction);
  store.addVoiceCommand({
    text,
    status: "success",
    parsed,
    timestamp: new Date().toISOString(),
  });

  return { success: true, parsed, transaction };
}

export function formatVoiceResponse(result: { success: boolean; parsed: ReturnType<typeof parseVoiceCommand>; transaction?: Omit<Transaction, "id">; error?: string }): string {
  if (!result.success) {
    return `I couldn't log that. ${result.error || "Please try again with an amount, like \"Spent $45 on groceries\""}`;
  }
  const { parsed } = result;
  const verb = parsed.type === "income" ? "logged income of" : "logged an expense of";
  return `Done! I ${verb} ${formatCurrency(parsed.amount)} for ${parsed.category}.`;
}
