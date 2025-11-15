import Image from "next/image";
import clsx from "clsx";

import { Section } from "@/common/layout";

import s from "./companies.module.scss";

export interface CompanyLogo {
  title: string;
  url?: string;
  imageUrl: string;
}

export interface CompaniesProps {
  subtitle?: string;
  companies: CompanyLogo[];
}

export function Companies(props: CompaniesProps) {
  return (
    <Section container="full">
      <h2 className="text-center tracking-tight text-dark-text-tertiary opacity-50">
        {props.subtitle}
      </h2>
      <div className="no-scrollbar flex max-w-full justify-center overflow-auto">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[30vw] bg-transparent bg-linear-to-r from-surface-primary dark:from-dark-surface-primary xl:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[30vw] bg-transparent bg-linear-to-l from-surface-primary dark:from-dark-surface-primary xl:hidden" />
        <div
          className={clsx("flex shrink-0 items-center gap-4 px-6 lg:gap-6 lg:px-12", s.scrollbar)}
        >
          {props.companies.map((company) => (
            <figure
              key={company.imageUrl ?? company.title}
              className="flex h-16 items-center px-2 py-3 lg:p-4"
            >
              <Image
                alt={company.title}
                className="w-24 lg:w-32"
                height={20}
                src={company.imageUrl}
                width={32}
              />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
