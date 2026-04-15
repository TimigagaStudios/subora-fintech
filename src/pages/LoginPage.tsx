import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Button, Card, Input } from "../components/ui";
import { setAuthed } from "../lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;

  const redirectTo = location?.state?.from || "/wallet";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-10 bg-secondary-background border-border">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,255,153,0.4)]">
            <TrendingUp size={28} className="text-black stroke-[2.5]" />
          </div>
          <span className="text-3xl font-black tracking-tight italic text-text-primary">
            Subora
          </span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-center text-text-primary">
              Welcome back
            </h2>
            <p className="text-text-secondary text-center text-sm">
              Enter your details to sign in
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">
                Email Address
              </label>
              <Input type="email" placeholder="name@company.com" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">
                Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Button
              className="w-full h-12 font-bold text-lg"
              onClick={() => {
                setAuthed(true);
                navigate(redirectTo, { replace: true });
              }}
            >
              Sign In
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <span className="relative bg-secondary-background px-4 text-xs font-bold text-text-secondary uppercase">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              Google
            </Button>
            <Button variant="outline" className="gap-2">
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-text-secondary font-medium">
            Don&apos;t have an account?{" "}
            <span className="text-accent font-bold cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}