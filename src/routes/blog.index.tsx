import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { PostCard } from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { CATEGORIES, getAllPosts, type Post } from "@/lib/posts";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "ארכיון המאמרים | רחל אפק" },
      {
        name: "description",
        content:
          "ארכיון מאמרי הדעה של רחל אפק – חיפוש לפי נושא, מילת מפתח וקטגוריה.",
      },
    ],
  }),
});

function BlogIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState(search.q ?? "");

  useEffect(() => { getAllPosts().then(setPosts); }, []);
  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const filtered = useMemo(() => {
    let list = posts;
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.excerpt.toLowerCase().includes(needle) ||
          p.tags.some((t) => t.toLowerCase().includes(needle)),
      );
    }
    return list;
  }, [posts, q, search.category]);

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 border-b border-border/70">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">ארכיון</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground">
          כל המאמרים
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          חפשי לפי מילת מפתח, או סננו לפי קטגוריה.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                const value = e.target.value;
                setQ(value);
                navigate({
                  search: (s: { q?: string; category?: string }) => ({
                    ...s,
                    q: value || undefined,
                  }),
                  replace: true,
                });
              }}
              placeholder="חיפוש במאמרים..."
              className="pr-9 h-11 bg-background"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <CategoryChip active={!search.category} to={{ category: undefined }}>
              הכל
            </CategoryChip>
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c}
                active={search.category === c}
                to={{ category: c }}
              >
                {c}
              </CategoryChip>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            לא נמצאו מאמרים שתואמים את החיפוש.
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function CategoryChip({
  active,
  to,
  children,
}: {
  active: boolean;
  to: { category?: string };
  children: React.ReactNode;
}) {
  return (
    <Link
      to="/blog"
      search={(s: { q?: string; category?: string }) => ({ ...s, ...to })}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
