import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPost, CATEGORIES } from "@/lib/posts";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/my-supabase/client";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({
    meta: [
      { title: "הוספת מאמר | רחל אפק" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function Admin() {
  const navigate = useNavigate();
  const { session, loading, user } = useAuth();
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [image, setImage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <SiteLayout>
        <div className="h-[50vh]" />
      </SiteLayout>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const post = await addPost({
        title: String(data.get("title") || "").trim(),
        excerpt: String(data.get("excerpt") || "").trim(),
        body: String(data.get("body") || "").trim(),
        category,
        tags: String(data.get("tags") || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        date:
          (data.get("date") as string) ||
          new Date().toISOString().slice(0, 10),
        image: image || undefined,
      });
      toast.success("המאמר נוסף");
      navigate({ to: "/blog/$slug", params: { slug: post.slug } });
    } catch (err) {
      toast.error((err as Error).message || "שמירה נכשלה");
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <SiteLayout>
      <Toaster position="top-center" />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-2">
              ניהול
            </p>
            <h1 className="font-serif text-4xl text-foreground">
              הוספת מאמר חדש
            </h1>
          </div>
          <div className="text-left text-sm text-muted-foreground">
            <div dir="ltr">{user?.email}</div>
            <button
              onClick={onLogout}
              className="mt-1 text-primary hover:underline"
            >
              יציאה
            </button>
          </div>
        </div>
        <p className="mt-3 text-muted-foreground">
          ניתן להשתמש ב־
          <code className="text-primary">## כותרת משנה</code>,{" "}
          <code className="text-primary">### כותרת קטנה</code> ו־
          <code className="text-primary">&gt; ציטוט</code> בתוך גוף המאמר.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">כותרת</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">תקציר</Label>
            <Textarea id="excerpt" name="excerpt" required rows={2} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label>קטגוריה</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">תאריך</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">תגיות (מופרדות בפסיק)</Label>
              <Input id="tags" name="tags" placeholder="חברה, דמוקרטיה" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">תמונה (קישור, אופציונלי)</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">גוף המאמר</Label>
            <Textarea
              id="body"
              name="body"
              required
              rows={14}
              className="font-serif text-base leading-relaxed"
            />
          </div>

          <Button type="submit" size="lg" disabled={busy}>
            {busy ? "שומר..." : "פרסום"}
          </Button>
        </form>
      </section>
    </SiteLayout>
  );
}
