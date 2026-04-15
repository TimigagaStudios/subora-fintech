import React from "react";
import { Briefcase, Layers } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";

export default function BusinessPage({ subscriptions }: { subscriptions: any[] }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Business Mode</h1>
          <p className="text-text-secondary font-medium">
            Subscriptions grouped by projects and clients.
          </p>
        </div>
        <Button variant="primary" className="gap-2">
          <Briefcase size={18} /> New Project
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Portfolio", "Subora App", "Internal Tools"].map((project) => (
          <Card key={project} className="group hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Layers size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold">{project}</h3>
              </div>
              <Badge variant="accent">$45.00/mo</Badge>
            </div>

            <div className="space-y-3 mb-6">
              {subscriptions.filter((s: any) => s.project_tag === project).map((sub: any) => (
                <div key={sub.id} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{sub.name}</span>
                  <span className="font-bold">${sub.price}</span>
                </div>
              ))}

              {subscriptions.filter((s: any) => s.project_tag === project).length === 0 && (
                <p className="text-xs text-text-secondary italic">No subscriptions tagged yet.</p>
              )}
            </div>

            <Button variant="outline" className="w-full text-xs font-bold py-2">
              Manage Project
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}