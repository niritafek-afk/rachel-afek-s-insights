import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PostCard } from "@/components/PostCard";
import {
  CATEGORIES,
  formatHebrewDate,
  getAllPosts,
  getFeaturedPost,
  type Post,
} from "@/lib/posts";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "רחל אפק | מגזין אישי – דעות, חברה, תרבות ואקטואליה" },
      {
        name: "description",
        content:
          "מאמרים אישיים על פוליטיקה, חברה, תרבות ואקטואליה – בעברית, ללא רעש מיותר.",
      },
    ],
  }),
});

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featured, setFeatured] = useState<Post | null>(null);

  useEffect(() => {
    getAllPosts().then(setPosts);
    getFeaturedPost().then(setFeatured);
  }, []);

  if (!featured) {
    return (
      <SiteLayout>
        <div className="h-[60vh]" />
      </SiteLayout>
    );
  }

  const latest = posts.filter((p) => p.slug !== featured.slug).slice(0, 5);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-border/70">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20 text-center">
          <p className="text-sm text-primary tracking-[0.3em] uppercase mb-4">
            מגזין אישי
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight max-w-3xl mx-auto">
            כתיבה איטית בעולם ממהר.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            מאמרי דעה, מחשבות שניות ושאלות פתוחות – על פוליטיקה, חברה, תרבות
            ואקטואליה בישראל.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs tracking-[0.25em] text-primary uppercase mb-6">
          המאמר המומלץ
        </p>
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group block"
        >
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="text-primary font-medium">{featured.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={featured.date}>{formatHebrewDate(featured.date)}</time>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight text-foreground group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {featured.excerpt}
              </p>
              <span className="inline-block mt-6 text-primary border-b border-primary/40 pb-0.5">
                קראי את המאמר ←
              </span>
            </div>
            <aside className="md:col-span-5 md:border-r md:pr-8 border-border">
              <p className="text-sm text-muted-foreground leading-relaxed font-serif italic">
                "כתיבה איטית. כתיבה שמכבדת את הקורא, ושמניחה שגם הוא יודע להחזיק
                שאלה פתוחה לכמה דקות לפני שהוא דורש תשובה."
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </Link>
      </section>

      {/* Latest + categories */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl text-foreground">המאמרים האחרונים</h2>
            <Link to="/blog" className="text-sm text-primary hover:underline">
              כל הארכיון ←
            </Link>
          </div>
          <div className="space-y-8">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
        <aside className="md:col-span-4">
          <div className="sticky top-24">
            <h2 className="font-serif text-2xl text-foreground mb-6">קטגוריות</h2>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => {
                const count = posts.filter((p) => p.category === c).length;
                return (
                  <li key={c}>
                    <Link
                      to="/blog"
                      search={{ category: c }}
                      className="flex items-center justify-between py-2 border-b border-border/60 group"
                    >
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {c}
                      </span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 p-6 bg-accent/40 rounded-md border border-border/60">
              <p className="font-serif text-lg text-primary">על המגזין</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                רחל אפק – סופרת ובעלת טור. מתגוררת בירושלים. כותבת על מה
                שמטריד אותה, מתוך הנחה שזה מטריד גם מישהי אחרת.
              </p>
              <Link
                to="/about"
                className="inline-block mt-4 text-sm text-primary border-b border-primary/40"
              >
                לקריאה נוספת ←
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
