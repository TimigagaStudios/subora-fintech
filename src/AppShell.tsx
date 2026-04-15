import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { clearAuthed } from "./lib/auth";

const PAGE_TO_PATH: Record<string, string> = {
  dashboard: "/dashboard",
  wallet: "/wallet",
  cards: "/cards",
  payments: "/payments",
  transactions: "/transactions",
  analytics: "/analytics",
  subscriptions: "/subscriptions",
  calendar: "/calendar",
  business: "/business",
  settings: "/settings",
};

const PATH_TO_PAGE: Record<string, string> = Object.entries(PAGE_TO_PATH).reduce(
  (acc, [page, path]) => {
    acc[path] = page;
    return acc;
  },
  {} as Record<string, string>
);

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = PATH_TO_PAGE[location.pathname] || "dashboard";

  const setActivePage = (page: string) => {
    navigate(PAGE_TO_PATH[page] || "/dashboard");
  };

  const user = { email: "alex@example.com" };

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
      user={user}
      onLogout={() => {
        clearAuthed();
        navigate("/login");
      }}
    >
      <Outlet />
    </Layout>
  );
}