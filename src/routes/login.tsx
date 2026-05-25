import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "כניסה | רחל אפק" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function Login() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/admin" });
  }, [session, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("ברוכה השבה");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("החשבון נוצר");
      }
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error((err as Error).message || "אירעה שגיאה");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <Toaster position="top-center" />
      <section className="max-w-md mx-auto px-6 py-20">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">
          אזור ניהול
        </p>
        <h1 className="font-serif text-4xl text-foreground">
          {mode === "signin" ? "כניסה" : "יצירת חשבון"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {mode === "signin"
            ? "התחברי כדי להוסיף ולנהל מאמרים."
            : "צרי חשבון פעם אחת. לאחר מכן תוכלי להיכנס מכל מכשיר."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">דוא"ל</Label>
            <Input
              id="email"
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={busy} className="w-full">
            {busy ? "רגע..." : mode === "signin" ? "כניסה" : "הרשמה"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-primary hover:underline"
        >
          {mode === "signin"
            ? "אין לך עדיין חשבון? יצירת חשבון"
            : "כבר יש לך חשבון? כניסה"}
        </button>
      </section>
    </SiteLayout>
  );
}
