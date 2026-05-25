import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatHebrewDate, getPostBySlug, type Post } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  component: PostPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} | רחל אפק` },
    ],
  }),
});

function PostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    getPostBySlug(slug).then((p) => setPost(p ?? null));
  }, [slug]);

  if (post === undefined) {
    return (
      <SiteLayout>
        <div className="h-[60vh]" />
      </SiteLayout>
    );
  }

  if (post === null) {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">המאמר לא נמצא</h1>
          <Link
            to="/blog"
            className="inline-block mt-6 text-primary border-b border-primary/40"
          >
            חזרה לארכיון ←
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center border-b border-border/70 pb-10 mb-10">
          <Link
            to="/blog"
            search={{ category: post.category }}
            className="text-xs tracking-[0.25em] uppercase text-primary"
          >
            {post.category}
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mt-4 text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            מאת רחל אפק · <time dateTime={post.date}>{formatHebrewDate(post.date)}</time>
          </div>
        </header>

        <div className="article-prose">
          {post.body.split(/\n\n+/).map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i}>{block.replace(/^##\s+/, "")}</h2>;
            }
            if (block.startsWith("### ")) {
              return <h3 key={i}>{block.replace(/^###\s+/, "")}</h3>;
            }
            if (block.startsWith("> ")) {
              return (
                <blockquote key={i}>
                  {block.replace(/^>\s+/, "").replace(/\n>\s?/g, " ")}
                </blockquote>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border/70 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/blog" className="text-primary hover:underline">
            ← חזרה לכל המאמרים
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
