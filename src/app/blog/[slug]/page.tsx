import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export const metadata = {
  title: "Blog post | Bespoke Ethos",
  description: "This is a placeholder post.",
} satisfies Metadata;

export default function BlogSlugPage({ params }: Props) {
  const title = params.slug.replace(/-/g, " ");
  return (
    <div className="max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-text-primary">{title}</h1>
      <p className="mt-4 text-text-secondary">This blog post will be published soon.</p>
    </div>
  );
}
