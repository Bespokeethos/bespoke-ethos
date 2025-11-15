import Image from "next/image";
import fs from "fs";
import path from "node:path";

import { ButtonLink } from "@/common/button";
import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { HeaderAccent } from "./header-accent";

export type HeaderNavLinkItem = {
  _id: string;
  _title: string;
  href?: string;
  link?: {
    __typename: "PageReferenceComponent" | "CustomTextComponent";
    page?: {
      pathname: string;
      _title: string;
    };
    text?: string;
  } | null;
};

export type HeaderNavLink = {
  _id: string;
  _title: string;
  href?: string;
  sublinks: { items: HeaderNavLinkItem[] };
};

export type HeaderCtaItem = {
  _id: string;
  label: string;
  href: string;
  type: "primary" | "secondary" | "tertiary" | null | undefined;
  icon: React.ReactNode | null;
};

export type HeaderData = {
  navbar: { items: HeaderNavLink[] };
  rightCtas: { items: HeaderCtaItem[] };
};

const pageRef = (pathname: string, title: string) => ({
  __typename: "PageReferenceComponent" as const,
  page: {
    pathname,
    _title: title,
  },
});

const FALLBACK_HEADER_NAV: HeaderNavLink[] = [
  {
    _id: "nav-home",
    _title: "Home",
    href: "/",
    sublinks: { items: [] },
  },
  {
    _id: "nav-products",
    _title: "Products",
    href: "/solutions",
    sublinks: {
      items: [
        {
          _id: "nav-products-flowstack",
          _title: "FlowstackT",
          link: pageRef("/solutions/flowstack", "FlowstackT"),
        },
        {
          _id: "nav-products-consensus",
          _title: "Consensus EngineT",
          link: pageRef("/solutions/consensus-engine", "Consensus EngineT"),
        },
        {
          _id: "nav-products-redbridging",
          _title: "RedbridgingT",
          link: pageRef("/solutions/redbridging", "RedbridgingT"),
        },
      ],
    },
  },
  {
    _id: "nav-business-essentials",
    _title: "Business Essentials",
    href: "",
    sublinks: {
      items: [
        {
          _id: "nav-business-chatbots",
          _title: "Chatbots",
          link: pageRef("/solutions/chatbots", "Chatbots"),
        },
        {
          _id: "nav-business-llm",
          _title: "LLM Setups",
          link: pageRef("/contact?service=llm-setups", "LLM Setups"),
        },
      ],
    },
  },
  {
    _id: "nav-about",
    _title: "About",
    href: "/about",
    sublinks: { items: [] },
  },
  {
    _id: "nav-testimonials",
    _title: "Testimonials",
    href: "/#testimonials",
    sublinks: { items: [] },
  },
  {
    _id: "nav-pricing",
    _title: "Pricing",
    href: "/pricing",
    sublinks: { items: [] },
  },
  {
    _id: "nav-faq",
    _title: "FAQ",
    href: "/faq",
    sublinks: { items: [] },
  },
  {
    _id: "nav-blog",
    _title: "Blog",
    href: "/blog",
    sublinks: { items: [] },
  },
  {
    _id: "nav-contact",
    _title: "Contact",
    href: "/contact",
    sublinks: { items: [] },
  },
  {
    _id: "nav-linkedin",
    _title: "LinkedIn",
    href: "https://www.linkedin.com/company/bespoke-ethos",
    sublinks: { items: [] },
  },
];

const FALLBACK_HEADER_CTAS: HeaderCtaItem[] = [
  {
    _id: "cta-book",
    label: "Book Free Assessment",
    href: "/book",
    type: "primary",
    icon: null,
  },
  {
    _id: "cta-calendly",
    label: "Schedule on Calendly",
    href: "https://calendly.com/contact-bespokeethos/30min",
    type: "secondary",
    icon: null,
  },
];

type LogoVariant = {
  url: string;
  alt: string | null;
  width: number;
  height: number;
  aspectRatio: string;
  blurDataURL: string;
};

type LogoData = {
  dark: LogoVariant;
  light: LogoVariant;
};

const FALLBACK_HEADER_LOGO: LogoData = {
  dark: {
    url: "/assets/logo-dark.png",
    alt: "Bespoke Ethos logo",
    width: 120,
    height: 120,
    aspectRatio: "1/1",
    blurDataURL: "",
  },
  light: {
    url: "/assets/logo-light.png",
    alt: "Bespoke Ethos logo",
    width: 120,
    height: 120,
    aspectRatio: "1/1",
    blurDataURL: "",
  },
};

type HeaderShellProps = {
  headerData: HeaderData;
  logo: LogoData;
  accentSrc?: string;
};

function HeaderShell({
  headerData,
  logo,
  accentSrc = "/assets/generated/header-accent.svg",
}: HeaderShellProps) {
  return (
    <header className="sticky left-0 top-0 z-100 flex w-full flex-col border-b border-border bg-surface-primary/98 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface-primary/98">
      <div className="relative flex h-16 sm:h-20 overflow-visible">
        <HeaderAccent className="absolute inset-0 -z-10" />
        {accentSrc ? (
          <Image
            src={accentSrc}
            alt=""
            fill
            priority
            className="pointer-events-none select-none object-cover opacity-30"
          />
        ) : null}
        <div className="container relative z-10 mx-auto grid w-full grid-cols-header place-items-center items-center px-4 sm:px-6 *:first:justify-self-start">
          <ButtonLink unstyled className="flex items-center ring-offset-2 header-logo-container" href="/">
            <span className="block md:hidden">
              <Image
                src="/assets/logo-mobile.png"
                alt="Bespoke Ethos"
                width={48}
                height={48}
                className="h-12 w-12 logo-no-bg"
                priority
              />
            </span>
            <span className="block dark:hidden">
              <Image
                src={logo.light.url}
                alt={logo.light.alt ?? ""}
                width={logo.light.width}
                height={logo.light.height}
                className="h-12 sm:h-16 md:h-20 w-auto logo-no-bg hidden md:block"
                priority
              />
            </span>
            <span className="hidden dark:block">
              <Image
                src={logo.dark.url}
                alt={logo.dark.alt ?? ""}
                width={logo.dark.width}
                height={logo.dark.height}
                className="h-12 sm:h-16 md:h-20 w-auto logo-no-bg hidden md:block"
                priority
              />
            </span>
          </ButtonLink>
          <DesktopMenu {...headerData} />
          <MobileMenu {...headerData} />
        </div>
      </div>
      {/* <TrustStrip size="thin" /> */}
    </header>
  );
}

export async function Header() {
  const headerData: HeaderData = {
    navbar: { items: FALLBACK_HEADER_NAV },
    rightCtas: { items: FALLBACK_HEADER_CTAS },
  };

  const genDir = path.join(process.cwd(), "public", "assets", "generated");
  const lightHeader = fs.existsSync(path.join(genDir, "logo-header-light.png"))
    ? "/assets/generated/logo-header-light.png"
    : fs.existsSync(path.join(process.cwd(), "public", "assets", "logo_light2.png"))
      ? "/assets/logo_light2.png"
      : FALLBACK_HEADER_LOGO.light.url;
  let darkHeader = fs.existsSync(path.join(genDir, "logo-header-dark.png"))
    ? "/assets/generated/logo-header-dark.png"
    : "";
  if (!darkHeader) {
    darkHeader = lightHeader;
  }

  const logo: LogoData = {
    dark: {
      url: darkHeader,
      alt: FALLBACK_HEADER_LOGO.dark.alt,
      width: 200,
      height: 60,
      aspectRatio: "3/1",
      blurDataURL: "",
    },
    light: {
      url: lightHeader,
      alt: FALLBACK_HEADER_LOGO.light.alt,
      width: 200,
      height: 60,
      aspectRatio: "3/1",
      blurDataURL: "",
    },
  };

  return <HeaderShell headerData={headerData} logo={logo} />;
}
