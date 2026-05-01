"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  ArrowLeftRight,
  Target,
  ShoppingBag,
  Settings,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Bell,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Page = "dashboard" | "ai-chat" | "transactions" | "budgets" | "instore";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ai-chat", label: "AI Assistant", icon: MessageSquare, badge: "AI" },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "budgets", label: "Budgets", icon: Target },
  { id: "instore", label: "In-Store Mode", icon: ShoppingBag, badge: "#1" },
];

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen transition-all duration-300 ease-in-out",
        "border-r border-[var(--border)]",
        "bg-[var(--bg-secondary)]",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
      style={{ flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 glow-indigo">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-lg font-bold gradient-text">Finia</span>
            <p className="text-[10px] text-[var(--text-muted)]">AI Finance</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={cn(
                "sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                isActive
                  ? "bg-[rgba(99,102,241,0.15)] text-[var(--accent-light)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-[var(--accent-light)]")} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                      item.badge === "AI"
                        ? "bg-[rgba(99,102,241,0.2)] text-[var(--accent-light)]"
                        : "bg-[rgba(245,158,11,0.2)] text-amber-400"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {isActive && (
                <div className="absolute right-0 w-0.5 h-8 bg-[var(--accent)] rounded-l" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="p-3 mx-2 mb-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300">AI Pro Active</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mb-2">
            Real-time spending insights & alerts enabled
          </p>
          <div className="w-full bg-[var(--border)] rounded-full h-1">
            <div className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[73%]" />
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-1">73 of 100 AI queries used</p>
        </div>
      )}

      <div className="px-2 pb-4 space-y-1">
        <button className={cn(
          "sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}>
          <Bell className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Notifications</span>}
        </button>
        <button className={cn(
          "sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}>
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>

      {/* Avatar */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-4 border-t border-[var(--border)]",
        collapsed && "justify-center"
      )}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
          J
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">Jordan Lee</p>
            <p className="text-[11px] text-[var(--text-muted)] truncate">Pro Member</p>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
