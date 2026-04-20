import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Thoughts on software engineering and product development",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-muted">
          Thoughts on software engineering, product development, and building
          better products.
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center text-muted">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}