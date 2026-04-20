import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-muted">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-muted">{post.description}</p>
      </header>
      <div className="prose prose-invert prose-accent max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}