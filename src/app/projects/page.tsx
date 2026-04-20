interface Project {
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  repo?: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A modern web application built with Next.js and TypeScript.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Project Two",
    description:
      "An open source library for building better React components.",
    tags: ["React", "TypeScript", "Rollup"],
  },
  {
    title: "Project Three",
    description: "A real-time collaboration tool for remote teams.",
    tags: ["Node.js", "WebSockets", "PostgreSQL"],
  },
];

export const metadata = {
  title: "Projects",
  description: "Check out my work",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-muted">
          A selection of projects I&apos;ve worked on. Check back often for
          updates!
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.demo || project.repo) && (
              <div className="mt-4 flex gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Demo →
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Code →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}