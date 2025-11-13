"use client";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { Button, ButtonLink } from "@/common/button";
import type { HeaderFragment, HeaderLiksFragment } from ".";
import { useToggleState } from "@/hooks/use-toggle-state";
import { useHasRendered } from "@/hooks/use-has-rendered";

// #region desktop 💻
/* -------------------------------------------------------------------------- */
/*                                   Desktop                                  */
/* -------------------------------------------------------------------------- */

export function NavigationMenuHeader({
  links,
  className,
}: {
  links: HeaderLiksFragment[];
  className?: string;
}) {
  return (
    <NavigationMenu
      className={clsx("relative z-1 flex-col justify-center lg:flex", className)}
      delayDuration={50}
    >
      <NavigationMenuList className="flex flex-1 gap-0.5 px-4">
        {links.map((link) =>
          link.sublinks.items.length > 0 ? (
            <NavigationMenuLinkWithMenu key={link._id} {...link} />
          ) : (
            <li key={link._id}>
              <NavigationMenuLink href={link.href ?? "#"}>{link._title}</NavigationMenuLink>
            </li>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavigationMenuLink({
  className,
  children,
  href,
  ...props
}: { children: React.ReactNode; href: string } & NavigationMenuLinkProps) {
  return (
    <NavigationMenuLinkPrimitive
      asChild
      className={clsx(
        "hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-4 pb-px tracking-tight lg:h-7 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <ButtonLink unstyled href={href}>
        {children}
      </ButtonLink>
    </NavigationMenuLinkPrimitive>
  );
}

function NavigationMenuLinkWithMenu({ _title, href, sublinks }: HeaderLiksFragment) {
  const [closeOnClick, setCloseOnClick] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const getPreviewSrc = (hrefOrTitle: string) => {
    const href = (hrefOrTitle || "").toLowerCase();
    if (href.includes("/solutions/flowstack") || href.includes("flowstack"))
      return "/assets/generated/hero-flowstack-square.webp";
    if (href.includes("/solutions/chatbots") || href.includes("chatbot"))
      return "/assets/generated/hero-chatbots-square.webp";
    if (href.includes("/solutions/consensus-engine") || href.includes("consensus"))
      return "/assets/generated/hero-consensus-square.webp";
    if (href.includes("/solutions/redbridging") || href.includes("redbridging"))
      return "/assets/generated/hero-redbridging-square.webp";
    if (href.includes("/solutions/llm-setups") || href.includes("llm"))
      return "/assets/solution-pillar-illustration.svg";
    return "/assets/solution-pillar-illustration.svg";
  };

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setCloseOnClick(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current!);
    setCloseOnClick(false);
  };

  return (
    <NavigationMenuItem key={`${href ?? ""}${_title}`} className="relative items-center gap-0.5">
      <NavigationMenuTrigger
        asChild
        onClick={(e) => {
          if (!closeOnClick) {
            e.preventDefault();
          }
        }}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        {href ? (
          <NavigationMenuLink href={href}>{_title}</NavigationMenuLink>
        ) : (
          <Button
            unstyled
            className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary inline-flex items-center gap-1 rounded-full pr-2 pb-px pl-4 tracking-tight lg:h-7 transition-colors duration-200"
            icon={<ChevronDownIcon className="text-text-tertiary dark:text-dark-text-tertiary" />}
          >
            {_title}
          </Button>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary absolute top-[calc(100%+8px)] w-[clamp(200px,32vw,320px)] rounded-lg border shadow-lg p-1">
        <div className="flex flex-col gap-1">
          <ul className="flex flex-col">
            {sublinks.items.map((sublink) => {
              const { href, _title } =
                sublink.link.__typename === "PageReferenceComponent"
                  ? {
                      href: sublink.link.page.pathname,
                      _title: sublink.link.page._title,
                    }
                  : {
                      href: sublink.link.text,
                      _title: sublink._title,
                    };

              return (
                <li key={sublink._id}>
                  <NavigationMenuLinkPrimitive asChild>
                    <ButtonLink
                      unstyled
                      className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150"
                      href={href}
                    >
                      {/* thumbnail preview */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getPreviewSrc(href || _title)}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-md object-cover"
                        loading="lazy"
                        decoding="async"
                        aria-hidden
                      />
                      <span className="truncate">{_title}</span>
                    </ButtonLink>
                  </NavigationMenuLinkPrimitive>
                </li>
              );
            })}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function DesktopMenu({ navbar, rightCtas }: HeaderFragment) {
  return (
    <>
      <NavigationMenuHeader className="hidden lg:flex" links={navbar.items} />
      <div className="hidden items-center gap-2 justify-self-end lg:flex">
        {rightCtas.items.map((cta) => {
          return (
            <ButtonLink key={cta._id} className="px-3.5!" href={cta.href} intent={cta.type}>
              {cta.label}
            </ButtonLink>
          );
        })}
      </div>
    </>
  );
}

// #region mobile 📱
/* -------------------------------------------------------------------------- */
/*                                   Mobile                                   */
/* -------------------------------------------------------------------------- */

export function MobileMenu({ navbar, rightCtas }: HeaderFragment) {
  const { handleToggle, isOn, handleOff } = useToggleState();

  return (
    <>
      <button
        aria-label="Toggle Menu"
        className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary col-start-3 flex items-center justify-center gap-2 justify-self-end rounded-sm border p-2 lg:hidden lg:h-7"
        onPointerDown={handleToggle}
      >
        <HamburgerMenuIcon className="size-4" />
      </button>
      <div className="block lg:hidden">
        {isOn ? (
          <div className="bg-surface-primary dark:bg-dark-surface-primary fixed top-[calc(var(--header-height)+1px)] left-0 z-10 h-auto w-full">
            <div className="flex flex-col gap-6 px-4 py-6">
              <nav className="flex flex-col gap-2">
                {navbar.items.map((link) =>
                  link.sublinks.items.length > 0 ? (
                    <ItemWithSublinks
                      key={link._id}
                      _id={link._id}
                      _title={link._title}
                      sublinks={link.sublinks.items}
                      onClick={handleOff}
                    />
                  ) : (
                    <Link
                      key={link._id}
                      className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-base font-medium"
                      href={link.href ?? "#"}
                      onClick={handleOff}
                    >
                      {link._title}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3">
                {/* Trust Badges for Mobile */}
                <div className="flex w-full items-center justify-center gap-2.5 opacity-80 py-2 border-t border-border dark:border-dark-border">
                  {/* NGLCC with caption */}
                  <figure className="flex flex-col items-center">
                    {/* light theme */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/nglcc-badge-dark.svg" alt="NGLCC Certified" height={16} className="h-4 w-auto block dark:hidden" loading="lazy" decoding="async" />
                    {/* dark theme */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/nglcc-badge-light.svg" alt="NGLCC Certified" height={16} className="h-4 w-auto hidden dark:block" loading="lazy" decoding="async" />
                    <figcaption className="mt-1 text-center text-[8pt] text-text-tertiary dark:text-dark-text-tertiary">
                      Gay Mens Field Guide LLC.
                    </figcaption>
                  </figure>
                  {/* Catalant (theme-aware) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/catalant-badge-dark.svg" alt="Catalant Vetted Consultant" height={16} className="h-4 w-auto block dark:hidden" loading="lazy" decoding="async" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/catalant-badge-light.svg" alt="Catalant Vetted Consultant" height={16} className="h-4 w-auto hidden dark:block" loading="lazy" decoding="async" />
                </div>
                {rightCtas.items.map((cta) => {
                  return (
                    <ButtonLink key={cta._id} href={cta.href} intent={cta.type} size="lg">
                      {cta.label}
                    </ButtonLink>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function ItemWithSublinks({
  _id,
  _title,
  sublinks,
  onClick,
}: {
  _id: string;
  _title: string;
  sublinks: HeaderLiksFragment["sublinks"]["items"];
  onClick: () => void;
}) {
  const { isOn, handleOff, handleOn } = useToggleState(false);
  const hasRendered = useHasRendered();
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!hasRendered) return;

    if (isOn) {
      listRef.current?.animate([{ height: `${(40 * sublinks.length).toString()}px` }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    } else {
      listRef.current?.animate([{ height: "0px" }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }, [isOn, hasRendered, sublinks]);

  const handleToggle = () => {
    if (isOn) {
      handleOff();
    } else {
      handleOn();
    }
  };

  return (
    <div key={_id}>
      <button className="flex items-center gap-2 px-3 py-2.5 text-base font-medium" onClick={handleToggle}>
        {_title}
        <ChevronDownIcon
          className={clsx(
            "text-text-tertiary dark:text-dark-text-tertiary h-min transform transition-transform",
            isOn ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <ul
        ref={listRef}
        className={clsx(
          "flex h-0 origin-top transform-gpu flex-col gap-2 overflow-hidden pl-4 transition-transform",
        )}
      >
        {sublinks.map((sublink) => {
          const { href, _title } =
            sublink.link.__typename === "PageReferenceComponent"
              ? {
                  href: sublink.link.page.pathname,
                  _title: sublink.link.page._title,
                }
              : {
                  href: sublink.link.text,
                  _title: sublink._title,
                };

          return (
            <li key={sublink._id}>
              <Link
                className="text-text-tertiary dark:text-dark-text-tertiary flex items-center gap-2 rounded-md px-3 py-2 text-sm"
                href={href}
                onClick={onClick}
              >
                {_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
