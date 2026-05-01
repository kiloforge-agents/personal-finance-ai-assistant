"use client";

import { useState } from "react";
import { Plus, Edit2, AlertTriangle, CheckCircle, Target, TrendingDown } from "lucide-react";
import { budgets } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Budgets() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overBudget = budgets.filter((b) => b.spent > b.limit);

  const chartData = budgets.map((b) => ({
    name: b.category,
    budget: b.limit,
    spent: b.spent,
  }));

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Budget Tracker</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">April 2025 · Monthly limits</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Budget
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Budget",
            value: `$${totalBudget.toLocaleString()}`,
            sub: "Monthly limit",
            color: "var(--accent)",
            icon: Target,
            bg: "rgba(99,102,241,0.08)",
            border: "rgba(99,102,241,0.2)",
          },
          {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString()}`,
            sub: `${Math.round((totalSpent / totalBudget) * 100)}% of budget`,
            color: totalSpent > totalBudget ? "var(--danger)" : "var(--warning)",
            icon: TrendingDown,
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.2)",
          },
          {
            label: "Remaining",
            value: `$${(totalBudget - totalSpent).toLocaleString()}`,
            sub: overBudget.length > 0 ? `${overBudget.length} over limit` : "All within limits",
            color: overBudget.length > 0 ? "var(--danger)" : "var(--success)",
            icon: overBudget.length > 0 ? AlertTriangle : CheckCircle,
            bg: overBudget.length > 0 ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
            border: overBudget.length > 0 ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)",
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: card.bg, border: `1px solid ${card.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <span className="text-sm text-[var(--text-muted)]">{card.label}</span>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{card.value}</p>
              <p className="text-xs mt-1" style={{ color: card.color }}>{card.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-3">
          {budgets.map((b) => {
            const pct = Math.min((b.spent / b.limit) * 100, 100);
            const over = b.spent > b.limit;
            const warning = pct >= 80 && !over;
            return (
              <div
                key={b.category}
                className="rounded-2xl p-4 hover-lift"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{b.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{b.category}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        ${b.spent} of ${b.limit} used
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {over && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[rgba(239,68,68,0.1)] text-red-400 font-medium">
                        Over by ${b.spent - b.limit}
                      </span>
                    )}
                    {warning && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[rgba(245,158,11,0.1)] text-amber-400 font-medium">
                        {Math.round(pct)}% used
                      </span>
                    )}
                    {!over && !warning && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[rgba(16,185,129,0.1)] text-emerald-400 font-medium">
                        {Math.round(pct)}% used
                      </span>
                    )}
                    <button
                      onClick={() => setEditingId(editingId === b.category ? null : b.category)}
                      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full h-2 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 progress-bar"
                      style={{
                        width: `${pct}%`,
                        background: over
                          ? "linear-gradient(90deg, #ef4444, #dc2626)"
                          : warning
                          ? "linear-gradient(90deg, #f59e0b, #d97706)"
                          : `linear-gradient(90deg, ${b.color}, ${b.color}cc)`,
                        boxShadow: over
                          ? "0 0 8px rgba(239,68,68,0.4)"
                          : !warning
                          ? `0 0 8px ${b.color}40`
                          : "none",
                      }}
                    />
                  </div>
                </div>

                {editingId === b.category && (
                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--text-muted)]">New limit: $</span>
                    <input
                      type="number"
                      defaultValue={b.limit}
                      className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                    />
                    <button className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium hover:opacity-90">
                      Save
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="col-span-2 rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold text-[var(--text-primary)] mb-1">Budget vs Spent</h3>
          <p className="text-xs text-[var(--text-muted)] mb-5">Visual comparison</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                formatter={(v: any) => [`$${v}`]}
                contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="budget" fill="var(--border-light)" radius={4} name="Budget" />
              <Bar dataKey="spent" radius={4} name="Spent">
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.spent > entry.budget ? "#ef4444" : budgets[i].color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[var(--border-light)]" />
              Budget limit
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[var(--accent)]" />
              Amount spent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
