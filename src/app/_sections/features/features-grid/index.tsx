import Image from "next/image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { TrackedButtonLink } from "@/app/_components/tracked_button";

export interface FeaturesGridIcon {
  url: string;
  alt?: string;
}

export interface FeaturesGridItem {
  id: string;
  title: string;
  description: string;
  icon?: FeaturesGridIcon | null;
}

export interface FeaturesGridHeading {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  tag?: string | null;
}

export interface FeaturesGridAction {
  id: string;
  href: string;
  label: string;
  type?: "primary" | "secondary" | "tertiary";
}

export interface FeaturesGridProps {
  heading: FeaturesGridHeading;
  featuresGridList: { items: FeaturesGridItem[] };
  actions?: FeaturesGridAction[];
}

export function FeaturesGrid({
  heading,
  featuresGridList,
  actions = [],
}: FeaturesGridProps) {
  return (
    <Section>
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {featuresGridList.items.map(({ id, title, description, icon }) => (
          <article
            key={id}
            className="border-border dark:border-dark-border flex flex-col gap-4 rounded-lg border p-4 [box-shadow:_70px_-20px_130px_0px_rgba(255,255,255,0.05)_inset] dark:[box-shadow:_70px_-20px_130px_0px_rgba(255,255,255,0.05)_inset]"
          >
            <figure className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary flex size-9 items-center justify-center rounded-full border p-2">
              {icon ? (
                <Image
                  alt={icon.alt ?? title}
                  className="dark:invert"
                  height={18}
                  src={icon.url}
                  width={18}
                />
              ) : null}
            </figure>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-lg font-medium">{title}</h5>
              <p className="text-text-secondary dark:text-dark-text-secondary text-pretty">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 md:order-3">
        {actions.map((action) => (
          <TrackedButtonLink
            key={action.id}
            href={action.href}
            intent={action.type}
            name="cta_click"
            size="lg"
          >
            {action.label}
          </TrackedButtonLink>
        ))}
      </div>
    </Section>
  );
}
