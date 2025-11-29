import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Chatbots (now Cadence  Your AI Concierge) | Bespoke Ethos",
  description:
    "This legacy Chatbots URL now routes to Cadence  Your AI Concierge—our flagship on-brand AI concierge offering.",
  alternates: { canonical: "/products/cadence" },
};

export default function ChatbotsPage() {
  redirect("/products/cadence");
}

