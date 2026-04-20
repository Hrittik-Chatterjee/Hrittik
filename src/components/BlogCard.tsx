import Link from "next/link";
import { BlogPost } from "@/lib/mdx";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>{post.date}</time>
        <span>·</span>
        <span>{post.category}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{post.description}</p>
    </Link>
  );
}