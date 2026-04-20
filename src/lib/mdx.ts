import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readingTime: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const dateValue = data.date;
      return {
        slug,
        title: data.title || "",
        date: dateValue instanceof Date ? dateValue.toISOString().split('T')[0] : String(dateValue || ""),
        category: data.category || "",
        description: data.description || "",
        readingTime: data.readingTime || "",
        content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const dateValue = data.date;
  return {
    slug,
    title: data.title || "",
    date: dateValue instanceof Date ? dateValue.toISOString().split('T')[0] : String(dateValue || ""),
    category: data.category || "",
    description: data.description || "",
    readingTime: data.readingTime || "",
    content,
  };
}