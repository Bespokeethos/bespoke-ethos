import Image from "next/image";

import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { DarkLightImage, type DarkLightImageProps } from "@/common/dark-light-image";

export interface BigFeatureIcon {
  url: string;
  alt?: string;
}

export interface BigFeatureItem {
  title: string;
  description: string;
  icon?: BigFeatureIcon | null;
}

export interface BigFeatureHeading {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  tag?: string | null;
}

export interface BigFeatureProps {
  featuresBigImageList: { items: BigFeatureItem[] };
  heading: BigFeatureHeading;
  image: DarkLightImageProps;
}

export function BigFeature({ featuresBigImageList, heading, image }: BigFeatureProps) {
  return (
    <Section container="default">
      <DarkLightImage
        height={600}
        width={1216}
        {...image}
        className="block rounded-xl border border-border dark:border-dark-border md:order-3 md:w-full"
      />
      <Heading {...heading}>
        <h4>{heading.title}</h4>
      </Heading>
      <div className="flex w-full flex-col items-start gap-4 md:order-2 md:grid md:grid-cols-3 md:gap-16">
        {featuresBigImageList.items.map(({ title, description, icon }) => (
          <article key={title} className="flex flex-col gap-4">
            <figure className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-secondary p-2 dark:border-dark-border dark:bg-dark-surface-secondary">
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
              <p className="text-text-tertiary dark:text-dark-text-tertiary">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
