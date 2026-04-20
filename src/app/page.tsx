import Desktop from "@/components/Desktop";
import { getBlogPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getBlogPosts();
  return <Desktop posts={posts} />;
}