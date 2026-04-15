import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import AppShell from "./AppShell";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

// Your existing views (already in repo)
import { WalletView } from "./components/Wallet";
import { TransactionsView } from "./components/Transactions";
import { PaymentsView } from "./components/Payments";
import { CardsView } from "./components/Cards";
import { AnalyticsView } from "./components/Analytics";
import { CalendarView } from "./components/Calendar";

import { MOCK_SUBSCRIPTIONS } from "./lib/mock";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import BusinessPage from "./pages/BusinessPage";

export default function App() {
  const subscriptions = MOCK_SUBSCRIPTIONS;

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        {/* Best after login */}
        <Route path="/" element={<Navigate to="/wallet" replace />} />

        <Route path="/dashboard" element={<DashboardPage subscriptions={subscriptions} />} />
        <Route path="/wallet" element={<WalletView />} />
        <Route path="/cards" element={<CardsView />} />
        <Route path="/payments" element={<PaymentsView />} />
        <Route path="/transactions" element={<TransactionsView />} />
        <Route path="/analytics" element={<AnalyticsView />} />
        <Route path="/calendar" element={<CalendarView subscriptions={subscriptions} />} />

        <Route path="/subscriptions" element={<SubscriptionsPage subscriptions={subscriptions} />} />
        <Route path="/business" element={<BusinessPage subscriptions={subscriptions} />} />

        {/* settings placeholder */}
        <Route path="/settings" element={<div className="text-text-secondary">Settings (next)</div>} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}