import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "צרו קשר | רחל אפק" },
      { name: "description", content: "ליצירת קשר עם רחל אפק – שאלות, תגובות והצעות." },
    ],
  }),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`פניה מהאתר: ${data.get("name") ?? ""}`);
    const body = encodeURIComponent(`${data.get("message") ?? ""}\n\n— ${data.get("name") ?? ""}\n${data.get("email") ?? ""}`);
    window.location.href = `mailto:rchlafek@gmail.com?subject=${subject}&body=${body}`;
    toast.success("פותח את תוכנת הדואר שלך…");
    setSubmitting(false);
    form.reset();
  }

  return (
    <SiteLayout>
      <Toaster position="top-center" />
      <section className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4 text-center">
          צרו קשר
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-center leading-tight">
          אשמח לשמוע ממך
        </h1>
        <p className="mt-5 text-center text-muted-foreground leading-relaxed">
          שאלות, תגובות, ביקורת, הצעות לכתיבה משותפת – הכל מתקבל בברכה.
          אני קוראת כל הודעה, ומשתדלת להשיב תוך מספר ימים.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3 p-5 rounded-md border border-border/70 bg-card">
            <User className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">השם שלי</p>
              <p className="font-serif text-lg text-foreground mt-0.5">רחל אפק</p>
            </div>
          </div>
          <a
            href="mailto:rchlafek@gmail.com"
            className="flex items-start gap-3 p-5 rounded-md border border-border/70 bg-card hover:border-primary transition-colors"
          >
            <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">דואר אלקטרוני</p>
              <p className="font-serif text-lg text-foreground mt-0.5" dir="ltr">
                rchlafek@gmail.com
              </p>
            </div>
          </a>
        </div>

        <form onSubmit={onSubmit} className="mt-12 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">שם</Label>
              <Input id="name" name="name" required placeholder="השם המלא שלך" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">דואר אלקטרוני</Label>
              <Input id="email" name="email" type="email" required placeholder="name@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">ההודעה שלך</Label>
            <Textarea id="message" name="message" required rows={6} placeholder="כתבי כאן…" />
          </div>
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
            שליחה
          </Button>
        </form>
      </section>
    </SiteLayout>
  );
}
