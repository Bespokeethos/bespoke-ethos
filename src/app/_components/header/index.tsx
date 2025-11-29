import Image from "next/image";
import { ButtonLink } from "@/common/button";
import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { HeaderAccent } from "./header-accent";
import { TrustStrip } from "../trust-strip";

export type HeaderNavLinkItem = {
  _id: string;
  _title: string;
  href?: string;
  link?:
    | {
        __typename: "PageReferenceComponent" | "CustomTextComponent";
        page?: {
          pathname: string;
          _title: string;
        };
        text?: string;
      }
    | null;
  children?: HeaderNavLinkItem[];
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
    href: undefined,
    sublinks: {
      items: [
        {
          _id: "nav-products-flagship-group",
          _title: "Flagship offerings",
          children: [
            {
              _id: "nav-products-cadence",
              _title: "Cadence – Your AI Concierge",
              link: pageRef("/products/cadence", "Meet Cadence – Your AI Concierge"),
            },
            {
              _id: "nav-products-consensus",
              _title: "Consensus Engine – Your AI Strategy Sprint",
              link: pageRef("/solutions/consensus-engine", "Consensus Engine – Your AI Strategy Sprint"),
            },
            {
              _id: "nav-products-redbridging",
              _title: "Automation Rescue",
              link: pageRef("/solutions/redbridging", "Automation Rescue"),
            },
            {
              _id: "nav-products-flowstack",
              _title: "Workflow Automation Setup",
              link: pageRef("/solutions/flowstack", "Workflow Automation Setup"),
            },
          ],
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
    _id: "nav-calendar",
    _title: "Consensus Calendar",
    href: "/calendar",
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
    _id: "cta-calendly",
    label: "Book Free Consult",
    href: "https://calendly.com/contact-bespokeethos/30min",
    type: "primary",
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
};

function HeaderShell({ headerData, logo }: HeaderShellProps) {
  return (
    <header className="sticky left-0 top-0 z-100 flex w-full flex-col border-b border-border bg-surface-primary/98 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface-primary/98">
      <div className="relative flex h-16 sm:h-20 overflow-visible">
        <HeaderAccent className="absolute inset-0 -z-10" />
        <div className="container relative z-10 mx-auto grid w-full grid-cols-header place-items-center items-center px-4 sm:px-6 *:first:justify-self-start">
          <ButtonLink unstyled className="flex items-center ring-offset-2 header-logo-container" href="/">
            <span className="block dark:hidden relative h-10 sm:h-12 md:h-16 w-[200px]">
              <Image
                src={logo.light.url}
                alt={logo.light.alt ?? ""}
                fill
                className="logo-no-bg object-contain w-full h-full"
                priority
              />
            </span>
            <span className="hidden dark:block relative h-10 sm:h-12 md:h-16 w-[200px]">
              <Image
                src={logo.dark.url}
                alt={logo.dark.alt ?? ""}
                fill
                className="logo-no-bg object-contain w-full h-full"
                priority
              />
            </span>
          </ButtonLink>
          <DesktopMenu {...headerData} />
          <MobileMenu {...headerData} />
        </div>
      </div>
      <TrustStrip
        size="thin"
        className="border-t border-border/60 bg-white/90 backdrop-blur-sm dark:border-dark-border/60 dark:bg-surface-primary/95"
      />
    </header>
  );
}

export async function Header() {
  const headerData: HeaderData = {
    navbar: { items: FALLBACK_HEADER_NAV },
    rightCtas: { items: FALLBACK_HEADER_CTAS },
  };

  const logo: LogoData = {
    dark: {
      url: "/assets/logo-dark.png",
      alt: FALLBACK_HEADER_LOGO.dark.alt,
      width: 200,
      height: 60,
      aspectRatio: "3/1",
      blurDataURL: "",
    },
    light: {
      url: "/assets/logo-light-2.png",
      alt: FALLBACK_HEADER_LOGO.light.alt,
      width: 200,
      height: 60,
      aspectRatio: "3/1",
      blurDataURL: "",
    },
  };

  return <HeaderShell headerData={headerData} logo={logo} />;
}

