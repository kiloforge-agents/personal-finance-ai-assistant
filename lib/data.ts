export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  type: "debit" | "credit";
  logo: string;
  location?: string;
};

export type Budget = {
  category: string;
  limit: number;
  spent: number;
  color: string;
  icon: string;
};

export type SpendingData = {
  month: string;
  food: number;
  shopping: number;
  transport: number;
  entertainment: number;
  health: number;
};

export const transactions: Transaction[] = [
  { id: "1", date: "2025-04-30", merchant: "Whole Foods Market", category: "Groceries", amount: 84.32, type: "debit", logo: "🛒", location: "Brooklyn, NY" },
  { id: "2", date: "2025-04-29", merchant: "Netflix", category: "Entertainment", amount: 15.99, type: "debit", logo: "🎬", location: "Online" },
  { id: "3", date: "2025-04-29", merchant: "Salary Deposit", category: "Income", amount: 4200.00, type: "credit", logo: "💰", location: "" },
  { id: "4", date: "2025-04-28", merchant: "Sweetgreen", category: "Dining", amount: 16.50, type: "debit", logo: "🥗", location: "Manhattan, NY" },
  { id: "5", date: "2025-04-27", merchant: "Uber", category: "Transport", amount: 23.10, type: "debit", logo: "🚗", location: "New York, NY" },
  { id: "6", date: "2025-04-26", merchant: "Target", category: "Shopping", amount: 112.45, type: "debit", logo: "🎯", location: "Queens, NY" },
  { id: "7", date: "2025-04-25", merchant: "Starbucks", category: "Dining", amount: 7.85, type: "debit", logo: "☕", location: "Brooklyn, NY" },
  { id: "8", date: "2025-04-24", merchant: "Spotify", category: "Entertainment", amount: 9.99, type: "debit", logo: "🎵", location: "Online" },
  { id: "9", date: "2025-04-23", merchant: "CVS Pharmacy", category: "Health", amount: 34.20, type: "debit", logo: "💊", location: "Brooklyn, NY" },
  { id: "10", date: "2025-04-22", merchant: "Con Edison", category: "Utilities", amount: 89.00, type: "debit", logo: "⚡", location: "" },
  { id: "11", date: "2025-04-21", merchant: "Amazon", category: "Shopping", amount: 67.99, type: "debit", logo: "📦", location: "Online" },
  { id: "12", date: "2025-04-20", merchant: "Planet Fitness", category: "Health", amount: 24.99, type: "debit", logo: "🏋️", location: "Brooklyn, NY" },
  { id: "13", date: "2025-04-18", merchant: "Trader Joe's", category: "Groceries", amount: 73.18, type: "debit", logo: "🛍️", location: "Manhattan, NY" },
  { id: "14", date: "2025-04-17", merchant: "Freelance Payment", category: "Income", amount: 850.00, type: "credit", logo: "💸", location: "" },
  { id: "15", date: "2025-04-16", merchant: "Chipotle", category: "Dining", amount: 13.75, type: "debit", logo: "🌯", location: "Brooklyn, NY" },
];

export const budgets: Budget[] = [
  { category: "Groceries", limit: 400, spent: 267, color: "#6366f1", icon: "🛒" },
  { category: "Dining", limit: 200, spent: 178, color: "#f59e0b", icon: "🍽️" },
  { category: "Shopping", limit: 300, spent: 312, color: "#ef4444", icon: "🛍️" },
  { category: "Transport", limit: 150, spent: 89, color: "#10b981", icon: "🚗" },
  { category: "Entertainment", limit: 100, spent: 76, color: "#8b5cf6", icon: "🎬" },
  { category: "Health", limit: 200, spent: 59, color: "#06b6d4", icon: "❤️" },
];

export const spendingData: SpendingData[] = [
  { month: "Nov", food: 320, shopping: 210, transport: 95, entertainment: 80, health: 40 },
  { month: "Dec", food: 410, shopping: 380, transport: 110, entertainment: 120, health: 60 },
  { month: "Jan", food: 290, shopping: 180, transport: 85, entertainment: 65, health: 30 },
  { month: "Feb", food: 350, shopping: 220, transport: 100, entertainment: 90, health: 45 },
  { month: "Mar", food: 380, shopping: 260, transport: 120, entertainment: 75, health: 55 },
  { month: "Apr", food: 445, shopping: 312, transport: 89, entertainment: 76, health: 59 },
];

export const inStoreProducts = [
  { id: "p1", barcode: "049000028928", name: "Coca-Cola 12-pack", price: 5.99, category: "Beverages", store: "Target", budgetImpact: "low", monthlyAvg: 11.98 },
  { id: "p2", barcode: "016000119765", name: "Cheerios Cereal", price: 4.49, category: "Groceries", store: "Whole Foods", budgetImpact: "low", monthlyAvg: 4.49 },
  { id: "p3", barcode: "012000801234", name: "Nike Running Shoes", price: 129.99, category: "Shopping", store: "Nike Store", budgetImpact: "high", monthlyAvg: 0 },
  { id: "p4", barcode: "038000138416", name: "Kellogg's Frosted Flakes", price: 3.79, category: "Groceries", store: "Target", budgetImpact: "low", monthlyAvg: 7.58 },
  { id: "p5", barcode: "021130126026", name: "Organic Almond Milk", price: 5.29, category: "Groceries", store: "Whole Foods", budgetImpact: "low", monthlyAvg: 15.87 },
];

export const aiSuggestions = [
  "How much did I spend on dining this month?",
  "Am I on track with my grocery budget?",
  "Where can I cut my spending?",
  "Show me my biggest expenses this week",
  "How does this month compare to last month?",
];

export function generateAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("dining") || lower.includes("food") || lower.includes("restaurant")) {
    return "📊 **Dining Analysis for April 2025**\n\nYou've spent **$178.10** on dining this month — that's **89% of your $200 budget**. Here's the breakdown:\n\n• Sweetgreen — $16.50\n• Starbucks — $7.85 *(3 visits this week)*\n• Chipotle — $13.75\n\n⚠️ **Heads up:** At your current pace, you'll exceed your dining budget by **~$22** before month-end. I'd suggest skipping 2–3 coffee runs this week to stay on track.\n\n💡 **Tip:** Your Starbucks spend has increased 40% compared to March. Consider brewing at home — you'd save ~$31/month.";
  }

  if (lower.includes("grocery") || lower.includes("groceries")) {
    return "🛒 **Grocery Budget Check**\n\nGreat news! Your grocery spending is well under control:\n\n• **Spent:** $267.50 of $400 budget\n• **Remaining:** $132.50 with 2 days left\n• **vs. Last Month:** ↓ 8% less than March\n\n✅ You're on track to come in **$85 under budget** — the best month in 6 months!\n\nYour most-visited stores:\n1. Whole Foods — $143.32\n2. Trader Joe's — $124.18\n\n💡 **Insight:** Trader Joe's visits save you ~22% vs. Whole Foods on comparable items. Shifting more trips there could save **$30–$40/month**.";
  }

  if (lower.includes("cut") || lower.includes("save") || lower.includes("reduce")) {
    return "✂️ **Top 3 Areas to Cut Spending**\n\nBased on your April transactions, here's where you have the most opportunity:\n\n**1. Shopping — Over Budget by $12 🚨**\nYou've spent $312 against a $300 limit. Amazon purchases are up 35% this month.\n\n**2. Subscriptions — $25.98/month**\nYou're paying for Netflix ($15.99) + Spotify ($9.99). Many banks offer free streaming bundles — check if yours does.\n\n**3. Coffee & Snacks — $47/month**\nSmall transactions add up. Your 12 café visits this month totaled $47.22.\n\n💰 **Potential Monthly Savings: $85–$120** if you optimize these three areas.";
  }

  if (lower.includes("biggest") || lower.includes("largest") || lower.includes("most")) {
    return "📈 **Your Biggest Expenses — April 2025**\n\nTop 5 transactions this month:\n\n1. 💰 Salary — **+$4,200.00** *(Apr 29)*\n2. 🎯 Target — **-$112.45** *(Apr 26)*\n3. ⚡ Con Edison — **-$89.00** *(Apr 22)*\n4. 📦 Amazon — **-$67.99** *(Apr 21)*\n5. 💊 CVS Pharmacy — **-$34.20** *(Apr 23)*\n\n📊 Your top spending category is **Shopping** at $312, followed by **Groceries** at $267 and **Dining** at $178.";
  }

  if (lower.includes("compare") || lower.includes("last month") || lower.includes("march")) {
    return "📅 **April vs. March Comparison**\n\n| Category | March | April | Change |\n|----------|-------|-------|--------|\n| Groceries | $290 | $267 | ↓ 8% ✅ |\n| Dining | $156 | $178 | ↑ 14% ⚠️ |\n| Shopping | $260 | $312 | ↑ 20% 🚨 |\n| Transport | $120 | $89 | ↓ 26% ✅ |\n| Entertainment | $75 | $76 | → Flat ✅ |\n\n**Net Change:** You spent **$35 more** in April vs. March.\n\n🎯 The good news: Transport and Grocery spending is down. The concern is Shopping jumping by $52 — mostly driven by the Target run on Apr 26.";
  }

  if (lower.includes("budget") || lower.includes("limit")) {
    return "📋 **Your Budget Overview — April 2025**\n\n✅ **On Track:**\n• Groceries: $267 / $400 (67%)\n• Transport: $89 / $150 (59%)\n• Entertainment: $76 / $100 (76%)\n• Health: $59 / $200 (30%)\n\n⚠️ **Approaching Limit:**\n• Dining: $178 / $200 (89%)\n\n🚨 **Over Budget:**\n• Shopping: $312 / $300 (104%)\n\n💡 Your overall budget health score is **B+**. Tighten dining and shopping to hit an A this month!";
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "👋 **Hey there!** I'm your AI Finance Assistant.\n\nI can help you with:\n\n• 📊 Analyzing your spending patterns\n• 💰 Tracking your budgets\n• 📈 Comparing month-over-month trends\n• 💡 Finding ways to save money\n• 🏪 Smart in-store purchase decisions\n\nWhat would you like to explore today?";
  }

  return "🤖 **AI Finance Insight**\n\nBased on your April 2025 spending data:\n\n• **Total Spent:** $1,081.31\n• **Total Income:** $5,050.00\n• **Net Savings:** $3,968.69\n\nYour savings rate this month is an excellent **78.6%** — well above the recommended 20%.\n\n💡 **Tip:** Try asking me about specific categories like *'How much did I spend on dining?'* or *'Where can I cut spending?'* for detailed insights.";
}
