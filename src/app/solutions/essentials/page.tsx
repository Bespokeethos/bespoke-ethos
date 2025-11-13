import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials | Bespoke Ethos",
  description: "Placeholder for the Essentials subtree.",
};

export default function EssentialsPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <h1 className="text-3xl font-semibold text-text-primary">Essentials</h1>
      <p className="mt-4 text-text-secondary">We&rsquo;ll fill in this experience soon. Reach out if you need essentials delivered today.</p>
    </div>
  );
}
