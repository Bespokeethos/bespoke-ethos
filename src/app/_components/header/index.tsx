import Image from "next/image";
import fs from "fs";
import path from "node:path";
import { ButtonLink } from "@/common/button";
import { Pump } from "basehub/react-pump";
import { buttonFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from "basehub";

import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { DarkLightImageAutoscale } from "@/common/dark-light-image";
import { HeaderAccent } from "./header-accent";
import { TrustStrip } from "../trust-strip";

const headerLinksFragment = fragmentOn("HeaderNavbarLinkComponent", {
  _title: true,
  href: true,
  _id: true,
  sublinks: {
    items: {
      _id: true,
      _title: true,
      link: {
        __typename: true,
        on_CustomTextComponent: {
          text: true,
        },
        on_PageReferenceComponent: {
          page: {
            pathname: true,
            _title: true,
          },
        },
      },
    },
  },
});

export type HeaderLiksFragment = fragmentOn.infer<typeof headerLinksFragment>;

export const headerFragment = fragmentOn("Header", {
  navbar: {
    items: headerLinksFragment,
  },
  rightCtas: {
    items: buttonFragment,
  },
});

export type HeaderFragment = fragmentOn.infer<typeof headerFragment>;

const SKIP_REMOTE_DATA = process.env.SKIP_REMOTE_DATA === "1";

const pageRef = (pathname: string, title: string) => ({
  __typename: "PageReferenceComponent" as const,
  page: {
    pathname,
    _title: title,
  },
});

const FALLBACK_HEADER_NAV: HeaderLiksFragment[] = [
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
          _title: "Flowstack™",
          link: pageRef("/solutions/flowstack", "Flowstack™"),
        },
        {
          _id: "nav-products-consensus",
          _title: "Consensus Engine™",
          link: pageRef("/solutions/consensus-engine", "Consensus Engine™"),
        },
        {
          _id: "nav-products-redbridging",
          _title: "Redbridging™",
          link: pageRef("/solutions/redbridging", "Redbridging™"),
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
    _id: "nav-faq",
    _title: "FAQ",
    href: "/faq",
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
] as HeaderLiksFragment[];

const FALLBACK_HEADER_CTAS: HeaderFragment["rightCtas"]["items"] = [
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
] as HeaderFragment["rightCtas"]["items"];

type LogoVariant = {
  url: string;
  alt: string | null;
  width: number;
  height: number;
  aspectRatio: string; // Basehub optimized image uses string ratios like "3/1"
  blurDataURL: string;
};

type LogoData = {
  dark: LogoVariant;
  light: LogoVariant;
};

// Use the same square logo referenced in JSON-LD as a safe local fallback
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
  headerData: HeaderFragment;
  logo: LogoData;
  accentSrc?: string;
  useLocalLogo?: boolean;
};

function HeaderShell({
  headerData,
  logo,
  accentSrc = "/assets/generated/header-accent.svg",
  useLocalLogo = false,
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
            {/* Mobile-specific logo: the orange drop */}
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
            {/* theme-aware logo */}
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
      {/* Thin trust badges row under the menu */}
      {/* <TrustStrip size="thin" /> */}
    </header>
  );
}

export async function Header() {
  if (SKIP_REMOTE_DATA) {
    const fallbackHeader = {
      navbar: { items: FALLBACK_HEADER_NAV },
      rightCtas: { items: FALLBACK_HEADER_CTAS },
    } as HeaderFragment;

    return <HeaderShell headerData={fallbackHeader} logo={FALLBACK_HEADER_LOGO} useLocalLogo />;
  }

  return (
    <Pump
      queries={[
        {
          site: {
            header: headerFragment,
            settings: {
              logo: {
                dark: {
                  url: true,
                  alt: true,
                  width: true,
                  height: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
                light: {
                  url: true,
                  alt: true,
                  width: true,
                  height: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { header, settings },
        },
      ]) => {
        "use server";

        const normalizedLogo: LogoData = settings.logo?.dark?.url && settings.logo?.light?.url
          ? {
              dark: {
                url: settings.logo.dark.url,
                alt: settings.logo.dark.alt,
                width: settings.logo.dark.width ?? 200,
                height: settings.logo.dark.height ?? 60,
                aspectRatio: settings.logo.dark.aspectRatio,
                blurDataURL: settings.logo.dark.blurDataURL ?? "",
              },
              light: {
                url: settings.logo.light.url,
                alt: settings.logo.light.alt,
                width: settings.logo.light.width ?? 200,
                height: settings.logo.light.height ?? 60,
                aspectRatio: settings.logo.light.aspectRatio,
                blurDataURL: settings.logo.light.blurDataURL ?? "",
              },
            }
          : FALLBACK_HEADER_LOGO;

        // filter out Blog if present from CMS
        // filter out Blog if present from CMS
        const filteredBase = {
          ...header,
          navbar: {
            items: header.navbar.items.filter((i) => {
              const t = (i._title || '').toLowerCase();
              const href = (i.href || (i as any).page?.pathname || '').toLowerCase();
              return t !== 'blog' && href !== '/blog';
            }),
          },
        } as HeaderFragment;

        // Normalize nav to the simplified set regardless of CMS
        const navItems = [
          { _id: "nav-home", _title: "Home", href: "/", sublinks: { items: [] } },
          {
            _id: "nav-products",
            _title: "Products",
            href: "/solutions",
            sublinks: {
              items: [
                { _id: "nav-products-flowstack", _title: "Flowstack™", link: pageRef("/solutions/flowstack", "Flowstack™") },
                { _id: "nav-products-consensus", _title: "Consensus Engine™", link: pageRef("/solutions/consensus-engine", "Consensus Engine™") },
                { _id: "nav-products-redbridging", _title: "Redbridging™", link: pageRef("/solutions/redbridging", "Redbridging™") },
              ],
            },
          },
          {
            _id: "nav-business-essentials",
            _title: "Business Essentials",
            href: "",
            sublinks: {
              items: [
                { _id: "nav-business-chatbots", _title: "Chatbots", link: pageRef("/solutions/chatbots", "Chatbots") },
                { _id: "nav-business-llm", _title: "LLM Setups", link: pageRef("/contact?service=llm-setups", "LLM Setups") },
              ],
            },
          },
          { _id: "nav-about", _title: "About", href: "/about", sublinks: { items: [] } },
          { _id: "nav-testimonials", _title: "Testimonials", href: "/#testimonials", sublinks: { items: [] } },
          { _id: "nav-faq", _title: "FAQ", href: "/faq", sublinks: { items: [] } },
          { _id: "nav-contact", _title: "Contact", href: "/contact", sublinks: { items: [] } },
          { _id: "nav-linkedin", _title: "LinkedIn", href: "https://www.linkedin.com/company/bespoke-ethos", sublinks: { items: [] } },
        ] as unknown as HeaderLiksFragment[];

        const filtered: HeaderFragment = { ...filteredBase, navbar: { items: navItems } } as HeaderFragment;

        // Prefer generated, tightly-cropped header logos if present
        const genDir = path.join(process.cwd(), "public", "assets", "generated");
        const lightHeader = fs.existsSync(path.join(genDir, "logo-header-light.png"))
          ? "/assets/generated/logo-header-light.png"
          : fs.existsSync(path.join(process.cwd(), "public", "assets", "logo_light2.png"))
            ? "/assets/logo_light2.png"
            : "/assets/logo-light.png";
        let darkHeader = fs.existsSync(path.join(genDir, "logo-header-dark.png"))
          ? "/assets/generated/logo-header-dark.png"
          : "";
        if (!darkHeader) {
          // Use the light header variant for dark theme if no dedicated dark header was generated
          darkHeader = lightHeader;
        }

        const localLogo: LogoData = {
          dark: { url: darkHeader, alt: "Bespoke Ethos logo", width: 200, height: 60, aspectRatio: "3/1", blurDataURL: "" },
          light: { url: lightHeader, alt: "Bespoke Ethos logo", width: 200, height: 60, aspectRatio: "3/1", blurDataURL: "" },
        };

        return <HeaderShell headerData={filtered} logo={localLogo} />;
      }}
    </Pump>
  );
}




