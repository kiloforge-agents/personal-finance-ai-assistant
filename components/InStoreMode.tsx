"use client";

import { useState, useEffect, useRef } from "react";
import {
  Scan,
  MapPin,
  ShoppingCart,
  X,
  Check,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  ArrowLeft,
  Store,
  Zap,
  Star,
} from "lucide-react";
import { inStoreProducts, budgets } from "@/lib/data";
import { cn } from "@/lib/utils";

type ScanState = "idle" | "scanning" | "result" | "added";

const stores = [
  { name: "Whole Foods Market", address: "238 Bedford Ave, Brooklyn", distance: "0.2 mi", category: "Grocery", logo: "🌿" },
  { name: "Target", address: "519 Gateway Dr, Brooklyn", distance: "0.8 mi", category: "General", logo: "🎯" },
  { name: "Nike Store", address: "650 5th Ave, Manhattan", distance: "3.1 mi", category: "Apparel", logo: "💟" },
  { name: "CVS Pharmacy", address: "127 Flatbush Ave, Brooklyn", distance: "0.5 mi", category: "Pharmacy", logo: "💊" },
];

const purchaseSuggestions = [
  { product: "Greek Yogurt", saving: "$1.20", tip: "Store brand vs name brand" },
  { product: "Chicken Breast", saving: "$3.50", tip: "Buy family pack, freeze extras" },
  { product: "Organic Spinach", saving: "$2.10", tip: "Frozen is just as nutritious" },
];

export default function InStoreMode() {
  const [activeStore, setActiveStore] = useState<typeof stores[0] | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedProduct, setScannedProduct] = useState<typeof inStoreProducts[0] | null>(null);
  const [cart, setCart] = useState<typeof inStoreProducts>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const groceryBudget = budgets.find((b) => b.category === "Groceries")!;

  const handleScan = () => {
    setScanState("scanning");
    setScanProgress(0);
    let prog = 0;
    progressRef.current = setInterval(() => {
      prog += 5;
      setScanProgress(prog);
      if (prog >= 100) {
        clearInterval(progressRef.current!);
        const product = inStoreProducts[productIndex % inStoreProducts.length];
        setScannedProduct(product);
        setProductIndex((p) => p + 1);
        setScanState("result");
      }
    }, 40);
  };

  const addToCart = () => {
    if (scannedProduct) {
      setCart((prev) => [...prev, scannedProduct]);
      setScanState("added");
      setTimeout(() => {
        setScanState("idle");
        setScannedProduct(null);
      }, 1800);
    }
  };

  const cartTotal = cart.reduce((s, p) => s + p.price, 0);

  const getBudgetImpact = (product: typeof inStoreProducts[0]) => {
    const newSpent = groceryBudget.spent + cartTotal + product.price;
    const pct = (newSpent / groceryBudget.limit) * 100;
    if (pct > 100) return { label: "Over Budget", color: "var(--danger)", bg: "rgba(239,68,68,0.1)", icon: AlertTriangle };
    if (pct > 80) return { label: "Near Limit", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: AlertTriangle };
    return { label: "Within Budget", color: "var(--success)", bg: "rgba(16,185,129,0.1)", icon: Check };
  };

  if (!activeStore) {
    return (
      <div className="p-6 space-y-6 animate-fadeIn">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">In-Store Mode</h1>
              <p className="text-xs text-amber-400 font-medium">#1 Most-Wanted Digital Feature · 2025</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)] ml-[52px]">
            Scan products in real-time and get AI-powered budget impact analysis before you buy
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { icon: "🔍", label: "Barcode Scanner" },
            { icon: "💰", label: "Budget Impact" },
            { icon: "🤖", label: "AI Price Insights" },
            { icon: "📊", label: "Spend Tracking" },
            { icon: "💡", label: "Smart Alternatives" },
          ].map((f) => (
            <div key={f.label} className="chip">
              <span>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-5 gradient-border" style={{ background: "var(--bg-card)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-[var(--text-primary)]">Today's Budget Snapshot</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {budgets.slice(0, 3).map((b) => {
              const pct = Math.min((b.spent / b.limit) * 100, 100);
              return (
                <div key={b.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">{b.icon} {b.category}</span>
                    <span className="font-medium" style={{ color: pct > 90 ? "var(--danger)" : "var(--text-primary)" }}>
                      ${b.limit - b.spent} left
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: pct > 90 ? "var(--danger)" : b.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            Nearby Stores
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {stores.map((store) => (
              <button
                key={store.name}
                onClick={() => setActiveStore(store)}
                className="flex items-center gap-3 p-4 rounded-2xl text-left hover-lift transition-all"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-2xl flex-shrink-0">
                  {store.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[var(--text-primary)] truncate">{store.name}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{store.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(99,102,241,0.08)] text-indigo-300 font-medium">
                      {store.category}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">📍 {store.distance}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-[var(--text-primary)]">AI Shopping Suggestions</h3>
          </div>
          <div className="space-y-3">
            {purchaseSuggestions.map((s) => (
              <div key={s.product} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{s.product}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.tip}</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">Save {s.saving}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setActiveStore(null); setScanState("idle"); setCart([]); }}
          className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-xl">
            {activeStore.logo}
          </div>
          <div>
            <h2 className="font-bold text-[var(--text-primary)]">{activeStore.name}</h2>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {activeStore.address} · {activeStore.distance}
            </p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">In-Store Active</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-4">
          <div className="rounded-2xl p-6 flex flex-col items-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 self-start">Barcode Scanner</h3>

            <div
              className={cn(
                "relative w-full max-w-[280px] h-[200px] rounded-2xl overflow-hidden mb-5",
                scanState === "scanning" ? "border-2 border-indigo-500" : "border-2 border-dashed border-[var(--border-light)]"
              )}
              style={{ background: "var(--bg-primary)" }}
            >
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
                <div
                  key={pos}
                  className={cn(
                    "absolute w-6 h-6 border-[var(--accent)]",
                    pos.includes("top") ? "top-3" : "bottom-3",
                    pos.includes("left") ? "left-3 border-l-2 border-t-2" : "right-3 border-r-2 border-t-2",
                    pos.includes("bottom") && pos.includes("left") ? "border-l-2 border-b-2 border-t-0" : "",
                    pos.includes("bottom") && pos.includes("right") ? "border-r-2 border-b-2 border-t-0" : "",
                  )}
                />
              ))}

              {scanState === "scanning" && (
                <div
                  className="scanner-line absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                  style={{ boxShadow: "0 0 8px rgba(99,102,241,0.8)" }}
                />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {scanState === "idle" && (
                  <>
                    <Scan className="w-12 h-12 text-[var(--text-muted)] mb-2" />
                    <p className="text-xs text-[var(--text-muted)]">Tap to scan a barcode</p>
                  </>
                )}
                {scanState === "scanning" && (
                  <>
                    <p className="text-xs font-medium text-indigo-400 animate-pulse mb-2">Scanning...</p>
                    <div className="w-32 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1">{scanProgress}%</p>
                  </>
                )}
                {scanState === "added" && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[rgba(16,185,129,0.2)] flex items-center justify-center">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-emerald-400">Added to cart!</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={scanState === "scanning" || scanState === "added"}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all",
                scanState === "idle"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:opacity-90"
                  : "bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
              )}
            >
              <Scan className="w-4 h-4" />
              {scanState === "scanning" ? "Scanning..." : "Scan Product"}
            </button>

            <p className="text-[10px] text-[var(--text-muted)] mt-3 text-center">
              Demo: scanning cycles through {inStoreProducts.length} sample products
            </p>
          </div>

          {scannedProduct && scanState === "result" && (
            <div className="rounded-2xl p-5 chat-message" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="font-semibold text-[var(--text-primary)]">AI Analysis</h3>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-3xl flex-shrink-0">
                  🛒
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[var(--text-primary)]">{scannedProduct.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-1">Barcode: {scannedProduct.barcode}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold gradient-text">${scannedProduct.price}</span>
                    <span className="text-xs text-[var(--text-muted)]">at {scannedProduct.store}</span>
                  </div>
                </div>
              </div>

              {(() => {
                const impact = getBudgetImpact(scannedProduct);
                const ImpactIcon = impact.icon;
                return (
                  <div className="p-3 rounded-xl mb-3 flex items-center gap-3" style={{ background: impact.bg }}>
                    <ImpactIcon className="w-4 h-4 flex-shrink-0" style={{ color: impact.color }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: impact.color }}>{impact.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        Grocery budget: ${groceryBudget.spent + cartTotal + scannedProduct.price} / ${groceryBudget.limit} after purchase
                      </p>
                    </div>
                  </div>
                );
              })()}

              <div className="p-3 rounded-xl bg-[rgba(99,102,241,0.06)] border border-[rgba(99,102,241,0.1)] mb-4">
                <p className="text-xs font-medium text-indigo-300 mb-1">📊 Monthly Context</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {scannedProduct.monthlyAvg > 0
                    ? `You typically buy this ${(scannedProduct.monthlyAvg / scannedProduct.price).toFixed(1)}x per month (~$${scannedProduct.monthlyAvg}/mo)`
                    : "This is a new purchase — not seen in your recent history."}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setScanState("idle")}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-4">
          <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[var(--accent-light)]" />
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">Cart</h3>
                {cart.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent)] text-white font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-6 text-center">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-[var(--text-muted)] opacity-30" />
                <p className="text-xs text-[var(--text-muted)]">No items yet</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Scan products to add them</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)] leading-tight">{item.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.category}</p>
                    </div>
                    <span className="text-sm font-bold text-[var(--text-primary)]">${item.price}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Total</span>
                  <span className="text-sm font-bold gradient-text">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-3">Budget Impact</h3>
            {budgets.map((b) => {
              const extraSpend = b.category === "Groceries" ? cartTotal : 0;
              const totalSpent = b.spent + extraSpend;
              const pct = Math.min((totalSpent / b.limit) * 100, 100);
              const over = totalSpent > b.limit;
              return (
                <div key={b.category} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-muted)]">{b.icon} {b.category}</span>
                    <span className={over ? "text-red-400 font-bold" : "text-[var(--text-muted)]"}>
                      ${totalSpent.toFixed(0)} / ${b.limit}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: over ? "var(--danger)" : b.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">Smart Tips</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)]">
                <p className="text-[11px] text-[var(--text-muted)]">
                  💡 <span className="text-indigo-300 font-medium">Store brands</span> are typically 20-30% cheaper with similar quality
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)]">
                <p className="text-[11px] text-[var(--text-muted)]">
                  🥦 <span className="text-emerald-300 font-medium">Seasonal produce</span> at this store: strawberries, asparagus, peas
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)]">
                <p className="text-[11px] text-[var(--text-muted)]">
                  ⚡ <span className="text-amber-300 font-medium">Weekly sale</span> ends tonight — check the app for deals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
