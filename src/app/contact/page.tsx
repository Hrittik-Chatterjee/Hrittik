export const metadata = {
  title: "Contact",
  description: "Get in touch",
};

const socials = [
  { name: "GitHub", url: "https://github.com" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "Email", url: "mailto:hello@example.com" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Get in touch</h1>
      <p className="mt-4 text-muted">
        I&apos;m always happy to hear about new opportunities, projects, or just
        to say hi. Here are the best ways to reach me:
      </p>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Socials</h2>
        <ul className="mt-4 space-y-2">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold">Or send me a message</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}