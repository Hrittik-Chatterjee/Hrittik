import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build better products with{" "}
            <span className="text-accent">better analytics</span>
          </h1>
          <p className="mt-6 text-lg text-muted">
            A personal portfolio showcasing my work in software engineering,
            product development, and technical writing. Welcome to my digital
            garden.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-surface px-8 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}