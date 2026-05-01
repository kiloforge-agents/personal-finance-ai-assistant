"use client";

import { useState } from "react";
import { Search, Filter, ArrowDownLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { transactions } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Groceries", "Dining", "Shopping", "Transport", "Entertainment", "Health", "Utilities", "Income"];

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const filtered = transactions
    .filter((tx) => {
      const matchesSearch =
        tx.merchant.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || tx.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.amount - a.amount;
    });

  const totalDebit = filtered.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
  const totalCredit = filtered.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-6 space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Transactions</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">April 2025 · {transactions.length} transactions</p>
        </div>
        <div className="flex gap-3">
          <div className="text-right">
            <p className="text-xs text-[var(--text-muted)]">Total Spent</p>
            <p className="text-lg font-bold text-red-400">-${totalDebit.toFixed(2)}</p>
          </div>
          <div className="w-px bg-[var(--border)]" />
          <div className="text-right">
            <p className="text-xs text-[var(--text-muted)]">Total Income</p>
            <p className="text-lg font-bold text-emerald-400">+${totalCredit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <button
          onClick={() => setSortBy(sortBy === "date" ? "amount" : "date")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Filter className="w-4 h-4" />
          Sort by: {sortBy === "date" ? "Date" : "Amount"}
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              activeCategory === cat
                ? "bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] text-[var(--accent-light)]"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          <div>Merchant</div>
          <div />
          <div>Category</div>
          <div>Date</div>
          <div className="text-right">Amount</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[var(--text-muted)]">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No transactions found</p>
          </div>
        ) : (
          <div>
            {filtered.map((tx, i) => (
              <div
                key={tx.id}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 transition-colors hover:bg-[rgba(255,255,255,0.02)]",
                  i !== filtered.length - 1 && "border-b border-[var(--border)]"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-lg">
                  {tx.logo}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{tx.merchant}</p>
                  {tx.location && (
                    <p className="text-xs text-[var(--text-muted)]">{tx.location}</p>
                  )}
                </div>
                <span className={cn(
                  "text-xs px-2.5 py-1 rounded-lg font-medium",
                  tx.category === "Income"
                    ? "bg-[rgba(16,185,129,0.1)] text-emerald-400"
                    : "bg-[rgba(99,102,241,0.08)] text-[var(--accent-light)]"
                )}>
                  {tx.category}
                </span>
                <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="flex items-center gap-1.5 justify-end">
                  {tx.type === "credit"
                    ? <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
                    : <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                  }
                  <span className={cn(
                    "text-sm font-bold",
                    tx.type === "credit" ? "text-emerald-400" : "text-[var(--text-primary)]"
                  )}>
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
