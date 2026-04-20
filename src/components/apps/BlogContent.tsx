import { BlogPost } from "@/lib/mdx";

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  return (
    <div style={{ fontFamily: FONT, color: "#1a1a1a", fontSize: 15, lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px 0" }}>📝 Blog Posts</h2>
      <p style={{ color: "#666", margin: "0 0 24px 0", fontSize: 14 }}>
        Thoughts on software engineering and product development.
      </p>

      {posts.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                borderRadius: 10,
                border: "1px solid #ebebeb",
                padding: "16px 18px",
                color: "#1a1a1a",
                textDecoration: "none",
                background: "#fff",
                transition: "box-shadow 0.15s, transform 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
                el.style.transform = "translateY(-2px)";
                el.style.borderColor = "#d0d0d0";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
                el.style.borderColor = "#ebebeb";
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                {post.category && (
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                    background: "#f0f0f0", color: "#666", border: "1px solid #e0e0e0",
                  }}>
                    {post.category}
                  </span>
                )}
                {post.date && (
                  <span style={{ fontSize: 12, color: "#aaa", alignSelf: "center" }}>{post.date}</span>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{post.title}</div>
              {post.description && (
                <div style={{ color: "#666", fontSize: 14 }}>{post.description}</div>
              )}
              <div style={{ marginTop: 10, fontSize: 13, color: "#0A84FF", fontWeight: 600 }}>
                Read post →
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div style={{
          borderRadius: 10,
          border: "1px dashed #ddd",
          padding: "40px 24px",
          textAlign: "center",
          color: "#aaa",
          background: "#fafafa",
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>No posts yet</div>
          <div style={{ fontSize: 13 }}>Check back soon — content is coming!</div>
        </div>
      )}
    </div>
  );
}
