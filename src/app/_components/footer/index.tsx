import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { BaseHubImage } from "basehub/next-image";
import { Pump } from "basehub/react-pump";

import { ThemeSwitcher } from "../theme-switcher";
import { ButtonLink } from "@/common/button";
import { DarkLightImageAutoscale } from "@/common/dark-light-image";

const SKIP_REMOTE_DATA = process.env.SKIP_REMOTE_DATA === "1";

type NavLink = { title: string; url: string };
type SocialLink = {
  title: string;
  url: string;
  iconUrl?: string | null;
  iconAsset?: string | null;
  Icon?: ComponentType<{ className?: string }>;
};

const FALLBACK_NAV_LINKS: NavLink[] = [
  { title: "Home", url: "/" },
  { title: "Products", url: "/solutions" },
  { title: "Cadence", url: "/products/cadence" },
  { title: "Contact", url: "/contact" },
];

const FALLBACK_SOCIAL_LINKS: SocialLink[] = [
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/company/bespoke-ethos",
    Icon: IconBrandLinkedin,
  },
];

const FALLBACK_COPYRIGHT = "© 2025 Bespoke Ethos. All rights reserved.";

type LogoVariant = {
  url: string;
  alt: string | null;
  width: number;
  height: number;
  aspectRatio: string; // Basehub optimized image uses string ratios like "3/1"
  blurDataURL: string;
};

type FooterLogo = {
  dark: LogoVariant;
  light: LogoVariant;
};

const FALLBACK_LOGO: FooterLogo = {
  dark: {
    url: "/assets/logo-dark.png",
    alt: "Bespoke Ethos logo",
    width: 200,
    height: 60,
    aspectRatio: "3/1",
    blurDataURL: "",
  },
  light: {
    url: "/assets/logo-light.png",
    alt: "Bespoke Ethos logo",
    width: 200,
    height: 60,
    aspectRatio: "3/1",
    blurDataURL: "",
  },
};

type FooterLayoutProps = {
  logo: FooterLogo;
  navItems: NavLink[];
  socialLinks: SocialLink[];
  showUseTemplate?: boolean;
  copyright: string;
  logoIsLocal?: boolean;
  backgroundSrc?: string;
};

function FooterLayout({
  logo,
  navItems,
  socialLinks,
  showUseTemplate,
  copyright,
  logoIsLocal,
  backgroundSrc = "/assets/generated/footer-wave.svg",
}: FooterLayoutProps) {
  return (
    <footer className="relative overflow-hidden border-t border-border py-5 dark:border-dark-border">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex w-full items-center justify-center gap-2.5 opacity-80">
        {/* NGLCC with caption */}
        <figure className="flex flex-col items-center">
          {/* light theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/nglcc-badge-dark.svg" alt="NGLCC Certified" height={12} className="h-3 w-auto block dark:hidden" loading="lazy" decoding="async" />
          {/* dark theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/nglcc-badge-light.svg" alt="NGLCC Certified" height={12} className="h-3 w-auto hidden dark:block" loading="lazy" decoding="async" />
          <figcaption className="mt-1 text-center text-[7pt] text-text-tertiary dark:text-dark-text-tertiary">
            Gay Mens Field Guide LLC.
          </figcaption>
        </figure>
        {/* Catalant (theme-aware) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/catalant-badge-dark.svg" alt="Catalant Vetted Consultant" height={12} className="h-3 w-auto block dark:hidden" loading="lazy" decoding="async" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/catalant-badge-light.svg" alt="Catalant Vetted Consultant" height={12} className="h-3 w-auto hidden dark:block" loading="lazy" decoding="async" />
        </div>
      </div>
      {backgroundSrc ? (
        <Image
          src={backgroundSrc}
          alt=""
          fill
          priority
          className="pointer-events-none select-none object-cover opacity-20"
        />
      ) : null}
      <div className="container relative z-10 mx-auto grid grid-cols-2 grid-rows-[auto_auto_auto] place-items-start items-center gap-y-4 px-4 sm:px-6 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-x-3 sm:gap-y-4">
        <Link aria-label="Homepage" href="/" className="footer-logo-container">
          {logoIsLocal ? (
            <>
              <Image
                alt="Bespoke Ethos logo"
                className="block h-auto w-32 sm:w-40 dark:hidden logo-no-bg"
                height={logo.light.height}
                src={logo.light.url}
                width={logo.light.width}
                priority
              />
              <Image
                alt="Bespoke Ethos logo"
                className="hidden h-auto w-32 sm:w-40 dark:block logo-no-bg"
                height={logo.dark.height}
                src={logo.dark.url}
                width={logo.dark.width}
                priority
              />
            </>
          ) : (
            <DarkLightImageAutoscale priority {...logo} />
          )}
        </Link>
        <nav className="col-start-1 row-start-3 flex flex-col gap-x-3 gap-y-2 self-start sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-row sm:items-center sm:place-self-center md:gap-x-3 lg:gap-x-6">
          {navItems.map(({ title, url }) => (
            <ButtonLink
              key={title}
              unstyled
              className="px-1 text-sm font-medium tracking-tight text-left text-text-tertiary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
              href={url}
              target={isExternalLink(url) ? "_blank" : "_self"}
            >
              {title}
            </ButtonLink>
          ))}
        </nav>
        {/* Offerings submenu (soft animated) */}
        <details className="col-span-2 row-start-2 mt-1 w-full sm:col-span-1 sm:col-start-2 sm:row-start-2">
          <summary className="text-text-primary dark:text-dark-text-primary cursor-pointer list-none text-sm font-medium text-left">
            Offerings
          </summary>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[{ label: 'Flowstack™', href: '/solutions/flowstack' }, { label: 'Chatbots', href: '/solutions/chatbots' }, { label: 'Consensus Engine™', href: '/solutions/consensus-engine' }, { label: 'Redbridging™', href: '/solutions/redbridging' }].map((i) => (
              <li key={i.href}>
                <ButtonLink unstyled className="text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary text-sm text-left" href={i.href}>
                  {i.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </details>
        {/* Theme switcher removed - site is light mode only */}

        <p className="col-span-2 sm:col-span-1 sm:col-start-1 sm:row-start-2 text-pretty text-[7pt] text-left sm:text-center mt-[4pt] text-text-tertiary dark:text-dark-text-tertiary">
          {copyright}
        </p>

        <ul className="col-span-2 col-start-1 row-start-3 flex w-full items-center gap-x-2.5 gap-y-3 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:w-auto sm:flex-wrap sm:justify-self-end">
          {socialLinks
            .filter((link) => (link.title || '').toLowerCase().includes('linkedin'))
            .map((link) => {
            const IconComponent = link.Icon;
            return (
              <li key={link.title} className="shrink-0 sm:first:ml-auto">
                <ButtonLink
                  unstyled
                  className="flex aspect-square items-center justify-center rounded-full p-2 hover:brightness-90 dark:brightness-90 dark:hover:brightness-110"
                  href={link.url}
                  target="_blank"
                  aria-label={link.title}
                >
                  {IconComponent ? (
                    <IconComponent className="size-5" />
                  ) : link.iconAsset ? (
                    <BaseHubImage alt={link.title} height={24} src={link.iconAsset} width={24} />
                  ) : link.iconUrl ? (
                    <Image alt={link.title} height={24} src={link.iconUrl} width={24} />
                  ) : (
                    <span className="text-xs font-semibold uppercase">{link.title}</span>
                  )}
                </ButtonLink>
              </li>
            );
          })}
      </ul>
      </div>
    </footer>
  );
}

function isExternalLink(url: string | null | undefined) {
  return !!url && /^https?:\/\//.test(url);
}

export async function Footer() {
  if (SKIP_REMOTE_DATA) {
    return (
      <FooterLayout
        logo={FALLBACK_LOGO}
        navItems={FALLBACK_NAV_LINKS}
        socialLinks={FALLBACK_SOCIAL_LINKS}
        copyright={FALLBACK_COPYRIGHT}
        showUseTemplate={false}
        logoIsLocal
        backgroundSrc="/assets/generated/footer-wave.svg"
      />
    );
  }

  return (
    <Pump
      queries={[
        {
          site: {
            settings: {
              logo: {
                dark: {
                  url: true,
                  height: true,
                  width: true,
                  alt: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
                light: {
                  url: true,
                  height: true,
                  width: true,
                  alt: true,
                  aspectRatio: true,
                  blurDataURL: true,
                },
              },
              showUseTemplate: true,
            },
            footer: {
              copyright: true,
              navbar: {
                items: {
                  _title: true,
                  url: true,
                },
              },
              socialLinks: {
                _title: true,
                icon: {
                  url: true,
                },
                url: true,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          site: { footer, settings },
        },
      ]) => {
        "use server";

        let navItems: NavLink[] = footer.navbar.items.length
          ? footer.navbar.items.map(({ _title, url }) => ({ title: _title, url: url ?? "#" }))
          : [...FALLBACK_NAV_LINKS];

        // Normalize to a minimal set for consistency
        navItems = [
          { title: "Home", url: "/" },
          { title: "Products", url: "/solutions" },
          { title: "Contact", url: "/contact" },
        ];

        const socialLinks: SocialLink[] = footer.socialLinks.length
          ? footer.socialLinks
              .map((link) => ({ title: link._title, url: link.url ?? '#', iconAsset: link.icon?.url ?? undefined }))
              .filter((l) => (l.title || '').toLowerCase().includes('linkedin'))
          : FALLBACK_SOCIAL_LINKS;

        // Force local dark logo for both themes to avoid CMS defaults
        const normalizedLogo: FooterLogo = {
          dark: {
            url: "/assets/logo-dark.png",
            alt: "Bespoke Ethos logo",
            width: 200,
            height: 60,
            aspectRatio: "3/1",
            blurDataURL: "",
          },
          light: {
            url: "/assets/logo-light.png",
            alt: "Bespoke Ethos logo",
            width: 200,
            height: 60,
            aspectRatio: "3/1",
            blurDataURL: "",
          },
        };

        return (
          <FooterLayout
            logo={normalizedLogo}
            navItems={navItems}
            socialLinks={socialLinks}
            // Always use local copyright to avoid stale CMS text
            copyright={FALLBACK_COPYRIGHT}
            showUseTemplate={false}
            logoIsLocal
          />
        );
      }}
    </Pump>
  );
}

function PoweredByBasehub({ className }: { className?: string }) {
  return (
    <ButtonLink
      unstyled
      className={className}
      href="https://basehub.com/basehub/marketing-website"
      target="_blank"
    >
      <Image
        alt="Use BaseHub Template"
        className="h-7 w-auto"
        height={28}
        src="https://basehub.com/template-button.svg"
        width={150}
      />
    </ButtonLink>
  );
}
