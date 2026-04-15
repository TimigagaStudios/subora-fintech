import React from "react";
import { LayoutGrid, List as ListIcon, Search } from "lucide-react";
import { Button, Card, Input } from "../components/ui";
import { SubscriptionRow } from "../components/Dashboard";

export default function SubscriptionsPage({ subscriptions }: { subscriptions: any[] }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">My Subscriptions</h1>
          <p className="text-text-secondary font-medium">
            Manage and track all your active services.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-text-primary/5 p-1 rounded-xl border border-border flex">
            <button className="p-2 bg-accent text-black rounded-lg shadow-sm">
              <ListIcon size={18} />
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg">
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </header>

      <Card className="p-2 overflow-hidden border-none shadow-none bg-transparent">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50"
            />
            <Input
              placeholder="Filter by name, category or tag..."
              className="pl-12 bg-text-primary/5 border-border"
            />
          </div>
          <Button variant="outline" size="md">
            Filter
          </Button>
        </div>

        <div className="space-y-1">
          {subscriptions.map((sub: any) => (
            <SubscriptionRow key={sub.id} sub={sub} />
          ))}
        </div>
      </Card>
    </div>
  );
}