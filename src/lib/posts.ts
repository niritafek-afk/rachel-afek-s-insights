import { supabase } from "@/integrations/my-supabase/client";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  image?: string;
  featured?: boolean;
};

export const CATEGORIES = ["פוליטיקה", "חברה", "תרבות", "אקטואליה"] as const;

type Row = {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  category: string;
  date: string;
  tags: string[] | null;
  image: string | null;
  featured: boolean | null;
};

function rowToPost(r: Row): Post {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    body: r.body ?? "",
    category: r.category,
    date: r.date,
    tags: r.tags ?? [],
    image: r.image ?? undefined,
    featured: r.featured ?? false,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,excerpt,body,category,date,tags,image,featured")
    .order("date", { ascending: false });
  if (error) {
    console.error("getAllPosts", error);
    return [];
  }
  return (data ?? []).map(rowToPost);
}

export async function getFeaturedPost(): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,excerpt,body,category,date,tags,image,featured")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getPostBySlug", error);
    return null;
  }
  return data ? rowToPost(data) : null;
}

export async function addPost(
  post: Omit<Post, "slug"> & { slug?: string },
): Promise<Post> {
  const slug =
    post.slug?.trim() ||
    `post-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const { data, error } = await supabase
    .from("posts")
    .insert({
      slug,
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      category: post.category,
      date: post.date,
      tags: post.tags,
      image: post.image ?? null,
      featured: post.featured ?? false,
    })
    .select("slug,title,excerpt,body,category,date,tags,image,featured")
    .single();
  if (error) throw error;
  return rowToPost(data as Row);
}

export function formatHebrewDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
