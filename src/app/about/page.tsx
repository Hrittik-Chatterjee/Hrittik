export const metadata = {
  title: "About",
  description: "Learn more about me",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
      <div className="mt-8 space-y-6 text-muted">
        <p>
          Hi, I&apos;m a software engineer passionate about building products
          that help developers be more productive. I specialize in web
          development with React, Next.js, and TypeScript.
        </p>
        <p>
          My journey in software started when I was curious about how
          websites worked. That curiosity led me to study computer science and
          eventually make a career out of building web applications.
        </p>
        <h2 className="text-xl font-semibold text-foreground">
          What I do
        </h2>
        <p>
          I currently work as a full-stack engineer, building products that
          serve thousands of users. My focus is on writing clean,
          maintainable code and creating intuitive user experiences.
        </p>
        <h2 className="text-xl font-semibold text-foreground">
          Writing
        </h2>
        <p>
          I believe in sharing knowledge. I write about software engineering,
          product development, and lessons learned from building products.
          When I&apos;m not coding, you can find me debugging production issues
          or explaining why that one edge case matters.
        </p>
        <h2 className="text-xl font-semibold text-foreground">
          Get in touch
        </h2>
        <p>
          Want to collaborate or just say hi? Feel free to reach out on
          social media or check out my projects page to see what I&apos;ve
          been working on.
        </p>
      </div>
    </div>
  );
}