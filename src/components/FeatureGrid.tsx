interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Web Development",
    description:
      "Building modern, performant web applications with React, Next.js, and TypeScript.",
    icon: "🌐",
  },
  {
    title: "Technical Writing",
    description:
      "Clear, concise documentation and blog posts that explain complex topics simply.",
    icon: "✍️",
  },
  {
    title: "Open Source",
    description:
      "Contributing to and maintaining open source projects that help developers.",
    icon: "🚀",
  },
  {
    title: "Product Development",
    description:
      "Ship products users love with focus on UX, performance, and accessibility.",
    icon: "💡",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            What I do
          </h2>
          <p className="mt-4 text-muted">
            I specialize in building products and writing about technology.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}