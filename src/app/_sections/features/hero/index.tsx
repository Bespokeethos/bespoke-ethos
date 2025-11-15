import Image from "next/image";
import clsx from "clsx";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { DarkLightImage, type DarkLightImageProps } from "@/common/dark-light-image";
import { TrackedButtonLink } from "@/app/_components/tracked_button";

import s from "./hero.module.scss";

export type FeatureHeroLayout = "Image bottom" | "Image Right" | "full image" | "gradient";

export interface FeatureHeroHeading {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  tag?: string | null;
}

export interface FeatureHeroAction {
  id: string;
  href: string;
  label: string;
  type?: "primary" | "secondary" | "tertiary";
}

export interface FeatureHeroProps {
  heading: FeatureHeroHeading;
  heroLayout: FeatureHeroLayout;
  image: DarkLightImageProps;
  actions?: FeatureHeroAction[];
}

export default function FeatureHero({
  heading,
  heroLayout,
  image,
  actions = [],
}: FeatureHeroProps) {
  switch (heroLayout) {
    case "Image bottom": {
      return (
        <Section>
          <div className="flex flex-col gap-6">
            <Heading {...heading}>
              <h4>{heading.title}</h4>
            </Heading>
            <div className="flex justify-center gap-3">
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
          </div>
          <DarkLightImage
            priority
            className="border-border dark:border-dark-border block rounded-lg border"
            {...image}
          />
        </Section>
      );
    }
    case "Image Right": {
      return (
        <Section>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-6 lg:pr-16">
              <Heading {...heading} align="left">
                <h4>{heading.title}</h4>
              </Heading>
              <div className="flex justify-start gap-3">
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
            </div>
            <DarkLightImage
              priority
              className="border-border dark:border-dark-border block flex-1 rounded-lg border lg:w-1/2"
              {...image}
            />
          </div>
        </Section>
      );
    }
    case "full image": {
      return (
        <>
          <DarkLightImage
            {...image}
            priority
            className="border-border dark:border-dark-border block max-h-[720px] w-full border-y border-t-0 object-cover"
          />
          <Section>
            <div className="flex items-center justify-between self-stretch">
              <Heading {...heading} align="left">
                <h4>{heading.title}</h4>
              </Heading>
              {actions && actions.length > 0 ? (
                <div className="flex gap-3">
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
              ) : null}
            </div>
          </Section>
        </>
      );
    }
    case "gradient": {
      return (
        <Section>
          <div className="z-10 flex flex-col items-center gap-8">
            <Image
              alt="Bespoke Ethos logo"
              className="size-20"
              height={80}
              src="/assets/logo-mobile.png"
              width={80}
            />
            <Heading {...heading}>
              <h4>{heading.title}</h4>
            </Heading>
            <div className="flex gap-3">
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
          </div>
          {/* Gradient */}
          <div
            className={clsx(
              "absolute -top-1/2 left-1/2 z-0 h-[400px] w-[60vw] -translate-x-1/2 scale-150 rounded-[50%]",
              s.gradient,
            )}
          />
        </Section>
      );
    }
    default: {
      return null;
    }
  }
}
