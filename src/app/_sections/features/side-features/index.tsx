import Image from "next/image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { TrackedButtonLink } from "@/app/_components/tracked_button";

export interface SideFeatureIcon {
  url: string;
  alt?: string;
}

export interface SideFeatureItem {
  title: string;
  subtitle: string;
  icon?: SideFeatureIcon | null;
}

export interface SideFeaturesAction {
  id: string;
  href: string;
  label: string;
  type?: "primary" | "secondary" | "tertiary";
}

export interface SideFeaturesHeading {
  title: string;
  subtitle?: string;
  tag?: string | null;
  align?: "left" | "center" | "right";
}

export interface SideFeaturesProps {
  featuresSideBySideList: { items: SideFeatureItem[] };
  heading: SideFeaturesHeading;
  actions?: SideFeaturesAction[];
}

export function SideFeatures({
  featuresSideBySideList,
  heading,
  actions = [],
}: SideFeaturesProps) {
  return (
    <Section
      className="relative lg:container lg:mx-auto lg:flex-row! lg:gap-0 lg:p-28"
      container="full"
    >
      <div className="relative top-0 container mx-auto shrink self-stretch px-6 lg:w-1/2 lg:pr-12 lg:pl-0 xl:pr-20">
        <div className="sticky top-[calc(var(--header-height)+40px)] bottom-0 flex flex-col gap-10">
          <Heading className="items-start" {...heading}>
            <h4>{heading.title}</h4>
          </Heading>
          <div className="flex items-center gap-3 md:order-3">
            {actions.map((action) => (
              <TrackedButtonLink
                key={action.id}
                href={action.href}
                intent={action.type}
                name="main_cta_click"
                size="lg"
              >
                {action.label}
              </TrackedButtonLink>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex-1 shrink-0 lg:w-1/2 lg:flex-1">
        <div className="no-scrollbar flex gap-10 overflow-auto px-6 lg:flex-col lg:px-0">
          {featuresSideBySideList.items.map(({ title, icon, subtitle }) => (
            <article
              key={title}
              className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary flex w-[280px] shrink-0 flex-col gap-4 rounded-lg border p-4 lg:w-full lg:flex-row lg:p-5"
            >
              <figure className="bg-surface-tertiary dark:bg-dark-surface-tertiary flex size-12 shrink-0 items-center justify-center rounded-full p-3">
                {icon ? (
                  <Image
                    alt={icon.alt ?? title}
                    className="dark:invert"
                    height={24}
                    src={icon.url}
                    width={24}
                  />
                ) : null}
              </figure>
              <div className="flex flex-col items-start gap-1">
                <h5 className="text-lg font-medium">{title}</h5>
                <p className="text-text-tertiary dark:text-dark-text-tertiary text-pretty">
                  {subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
