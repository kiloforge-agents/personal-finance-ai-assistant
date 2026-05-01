"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";

const Dashboard = dynamic(() => import("@/components/Dashboard"), { ssr: false });
const AIChat = dynamic(() => import("@/components/AIChat"), { ssr: false });
const Transactions = dynamic(() => import("@/components/Transactions"), { ssr: false });
const Budgets = dynamic(() => import("@/components/Budgets"), { ssr: false });
const InStoreMode = dynamic(() => import("@/components/InStoreMode"), { ssr: false });

type Page = "dashboard" | "ai-chat" | "transactions" | "budgets" | "instore";

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "ai-chat" && (
          <div className="h-full flex flex-col">
            <AIChat />
          </div>
        )}
        {activePage === "transactions" && <Transactions />}
        {activePage === "budgets" && <Budgets />}
        {activePage === "instore" && <InStoreMode />}
      </main>
    </div>
  );
}
