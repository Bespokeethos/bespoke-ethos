import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { Accordion } from "../accordion-faq";

export type FaqQuestion = {
  _analyticsKey?: string;
  _title: string;
  answer: string;
};

export type FaqHeading = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  tag?: string | null;
};

export type FaqProps = {
  heading: FaqHeading;
  layout?: "accordion" | "grid";
  questions: {
    items: FaqQuestion[];
  };
};

export function Faq(faq: FaqProps) {
  const isAccordion = faq.layout === "accordion";

  if (isAccordion) {
    return (
      <Section>
        <Heading {...faq.heading}>
          <h4>{faq.heading.title}</h4>
        </Heading>
        <div className="mx-auto flex w-full gap-8 md:max-w-(--breakpoint-sm) lg:max-w-(--breakpoint-md) lg:gap-14 lg:px-24 xl:max-w-(--breakpoint-xl)">
          <Accordion items={faq.questions.items} />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <Heading {...faq.heading}>
        <h4>{faq.heading.title}</h4>
      </Heading>
      <ul className="mx-auto flex w-full grid-cols-3 flex-col place-content-start items-start gap-8 self-stretch lg:grid lg:gap-14 lg:px-24">
        {faq.questions.items.map((question) => (
          <li key={question._title} className="flex flex-col gap-1.5">
            <p className="leading-relaxed font-medium tracking-tighter sm:text-lg">
              {question._title}
            </p>
            <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm leading-relaxed tracking-tight sm:text-base">
              {question.answer}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
