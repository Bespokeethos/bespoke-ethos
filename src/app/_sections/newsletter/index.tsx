"use client";

import * as React from "react";
import { Section } from "@/common/layout";
import { Pump } from "basehub/react-pump";
import { Input } from "@/common/input";

type NewsletterCopy = {
  title: string;
  description: string;
};

function NewsletterForm({ copy }: { copy: NewsletterCopy }) {

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage("Enter your email to subscribe.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(body.error || "Subscription failed. Try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("[NEWSLETTER_SUBSCRIBE] Unexpected error:", err);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <Section className="bg-surface-secondary dark:bg-dark-surface-secondary py-10!" container="full">
      <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:justify-between">
        <div className="flex flex-1 flex-col items-start gap-1">
          <h5 className="text-xl font-medium lg:text-2xl">{copy.title}</h5>
          <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
            {copy.description}
          </p>
        </div>

        <form className="flex w-full max-w-lg flex-col gap-2" onSubmit={onSubmit}>
          <Input
            aria-label="Email address"
            autoComplete="email"
            buttonContent={status === "loading" ? "…" : "Subscribe"}
            disabled={status === "loading"}
            error={errorMessage}
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
              if (errorMessage) {
                setErrorMessage(null);
              }
            }}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
          {status === "success" ? (
            <p className="text-sm text-success">Thanks for subscribing! Check your inbox soon.</p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}

export function Newsletter() {
  return (
    <Pump
      queries={[
        {
          site: {
            footer: {
              newsletter: {
                title: true,
                description: true,
              },
            },
          },
        },
      ]}
    >
      {async ([{ site }]) => {
        const copy: NewsletterCopy = {
          title: site.footer.newsletter?.title ?? "Stay in the loop",
          description:
            site.footer.newsletter?.description ??
            "Get AI workflow tactics, founder-proof automations, and launch notes once a month.",
        };

        return <NewsletterForm copy={copy} />;
      }}
    </Pump>
  );
}
