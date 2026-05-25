import { Link } from "@tanstack/react-router";
import { formatHebrewDate, type Post } from "@/lib/posts";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <article className="group border-b border-border/70 pb-6">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="text-primary font-medium tracking-wide">{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatHebrewDate(post.date)}</time>
        </div>
        <h3
          className={`font-serif text-foreground group-hover:text-primary transition-colors leading-snug ${
            compact ? "text-xl" : "text-2xl md:text-[1.7rem]"
          }`}
        >
          {post.title}
        </h3>
        {!compact && (
          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="inline-block mt-3 text-sm text-primary">קראי עוד ←</span>
      </Link>
    </article>
  );
}
