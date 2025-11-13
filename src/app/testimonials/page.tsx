import type { Metadata } from "next";
import { Section } from "@/common/layout";
import { Heading } from "@/common/heading";
import { Breadcrumbs } from "@/app/_components/seo/breadcrumbs";
import {
  Testimonials,
  testimonialsSliderFragment,
  type TestimonialsSlider,
} from "@/app/_sections/testimonials";
import { basehub } from "basehub";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Testimonials | Bespoke Ethos",
  description: "Proof you can feel — stories from teams who reclaimed time and stayed in control.",
  alternates: { canonical: "/testimonials" },
};

const TESTIMONIALS_PATH = "/testimonials";

async function fetchTestimonialsSlider(): Promise<TestimonialsSlider> {
  const draft = (await draftMode()).isEnabled;
  const data = await basehub({ draft }).query({
    site: {
      pages: {
        __args: {
          filter: { pathname: { eq: TESTIMONIALS_PATH } },
          limit: 1,
        },
        items: {
          sections: {
            __typename: true,
            on_TestimonialSliderComponent: testimonialsSliderFragment,
          },
        },
      },
    },
  });

  const page = data.site.pages.items.at(0);
  if (!page) {
    return notFound();
  }

  const sliderSection = page.sections?.find((section) => section?.__typename === "TestimonialSliderComponent");
  if (!sliderSection) {
    return notFound();
  }

  return sliderSection as TestimonialsSlider;
}

export default async function TestimonialsPage() {
  const slider = await fetchTestimonialsSlider();
  return (
    <Section className="gap-6">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]} />
      <Heading align="left" subtitle="Proof in Shipped Outcomes">
        <h1>Testimonials</h1>
      </Heading>
      <Testimonials {...slider} />
    </Section>
  );
}

