"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Target,
  CreditCard,
  DollarSign,
  PiggyBank,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { transactions, budgets, spendingData } from "@/lib/data";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Monthly Income",
    value: "$5,050",
    change: "+12.4%",
    up: true,
    icon: ArrowDownLeft,
    color: "var(--success)",
    bg: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.2)",
  },
  {
    label: "Total Spending",
    value: "$1,081",
    change: "+3.2%",
    up: false,
    icon: ArrowUpRight,
    color: "var(--danger)",
    bg: "rgba(239, 68, 68, 0.08)",
    border: "rgba(239, 68, 68, 0.2)",
  },
  {
    label: "Net Savings",
    value: "$3,969",
    change: "+14.1%",
    up: true,
    icon: PiggyBank,
    color: "var(--accent)",
    bg: "rgba(99, 102, 241, 0.08)",
    border: "rgba(99, 102, 241, 0.2)",
  },
  {
    label: "Savings Rate",
    value: "78.6%",
    change: "+5.2%",
    up: true,
    icon: Target,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
  },
];

const pieColors = ["#6366f1", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6", "#06b6d4"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs">
        <p className="font-semibold text-[var(--text-primary)] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="capitalize">
            {p.name}: <span className="font-bold">${p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const pieData = budgets.map((b) => ({ name: b.category, value: b.spent }));
  const recentTx = transactions.slice(0, 5);

  const aiAlerts = [
    { type: "warning", msg: "Shopping budget exceeded by $12 — consider pausing non-essential purchases." },
    { type: "tip", msg: "Switching 2 coffee runs to home brew saves ~$31/month automatically." },
    { type: "success", msg: "Transport spending down 26% vs last month — great job! 🎉" },
  ];

  if (!mounted) return null;

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Good morning, Jordan 👋
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-0.5">
            Here's your financial overview for April 2025
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">3 AI Insights Ready</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-5 hover-lift animate-countUp"
              style={{
                background: "var(--bg-card)",
                border: `1px solid var(--border)`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold flex items-center gap-1",
                    s.up ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Spending Chart */}
        <div className="col-span-2 rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Spending Trends</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">6-month breakdown by category</p>
            </div>
            <div className="flex gap-3 text-xs text-[var(--text-muted)]">
              {[
                { c: "#6366f1", l: "Groceries" },
                { c: "#f59e0b", l: "Dining" },
                { c: "#ef4444", l: "Shopping" },
                { c: "#10b981", l: "Transport" },
              ].map((x) => (
                <div key={x.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: x.c }} />
                  {x.l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={spendingData}>
              <defs>
                {[
                  { id: "food", color: "#6366f1" },
                  { id: "shopping", color: "#ef4444" },
                  { id: "transport", color: "#10b981" },
                  { id: "dining", color: "#f59e0b" },
                ].map((g) => (
                  <linearGradient key={g.id} id={`grad-${g.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={g.color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="food" stroke="#6366f1" fill="url(#grad-food)" strokeWidth={2} name="Groceries" />
              <Area type="monotone" dataKey="shopping" stroke="#ef4444" fill="url(#grad-shopping)" strokeWidth={2} name="Shopping" />
              <Area type="monotone" dataKey="transport" stroke="#10b981" fill="url(#grad-transport)" strokeWidth={2} name="Transport" />
              <Area type="monotone" dataKey="entertainment" stroke="#f59e0b" fill="url(#grad-dining)" strokeWidth={2} name="Entertainment" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold text-[var(--text-primary)] mb-1">Category Split</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">April spending</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`$${v}`, ""]} contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {budgets.slice(0, 4).map((b, i) => (
              <div key={b.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: pieColors[i] }} />
                  <span className="text-[var(--text-muted)]">{b.category}</span>
                </div>
                <span className="font-medium text-[var(--text-primary)]">${b.spent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Recent Transactions */}
        <div className="col-span-2 rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Recent Transactions</h3>
            <span className="text-xs text-[var(--accent-light)] cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-1">
            {recentTx.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-lg flex-shrink-0">
                  {tx.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{tx.merchant}</p>
                  <p className="text-xs text-[var(--text-muted)]">{tx.category} · {tx.date}</p>
                </div>
                <span
                  className={cn(
                    "text-sm font-bold",
                    tx.type === "credit" ? "text-emerald-400" : "text-[var(--text-primary)]"
                  )}
                >
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Alerts */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-[var(--text-primary)]">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiAlerts.map((a, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-xl text-xs leading-relaxed",
                  a.type === "warning" && "bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)]",
                  a.type === "tip" && "bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]",
                  a.type === "success" && "bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)]"
                )}
              >
                <div className="flex items-start gap-2">
                  {a.type === "warning" && <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />}
                  {a.type === "tip" && <Sparkles className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />}
                  {a.type === "success" && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />}
                  <span className="text-[var(--text-secondary)]">{a.msg}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Net worth indicator */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">Financial Health Score</span>
            </div>
            <div className="text-2xl font-bold gradient-text">84 / 100</div>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Excellent · Top 15% of users</p>
            <div className="mt-2 w-full bg-[var(--border)] rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[84%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
