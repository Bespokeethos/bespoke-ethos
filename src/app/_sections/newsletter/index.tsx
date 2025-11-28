"use client";

import { Section } from "@/common/layout";
import { ButtonLink } from "@/common/button";

const FALLBACK_COPY = {
  title: "Stay in the loop",
  description: "Get AI workflow tactics and launch notes directly in your inbox once a month.",
};

export function Newsletter() {
  return (
    <Section className="bg-surface-secondary dark:bg-dark-surface-secondary py-10! overflow-hidden" container="full">
      <div className="container mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col items-start gap-1">
          <h5 className="text-xl font-medium lg:text-2xl">{FALLBACK_COPY.title}</h5>
          <p className="text text-text-tertiary dark:text-dark-text-tertiary lg:text-lg">
            {FALLBACK_COPY.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:max-w-lg sm:flex-row sm:items-center sm:justify-end">
          <ButtonLink intent="primary" size="lg" href="https://form.jotform.com/253292960463058" target="_blank">
            Subscribe via Jotform
          </ButtonLink>
          <ButtonLink intent="secondary" size="lg" href="https://calendly.com/contact-bespokeethos/30min" target="_blank">
            Book a call
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
