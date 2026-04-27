import AppLayout from "@/components/AppLayout";
import { getBlogPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getBlogPosts();
  return <AppLayout posts={posts} />;
}