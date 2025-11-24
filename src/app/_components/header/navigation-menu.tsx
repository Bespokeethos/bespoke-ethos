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
import type { HeaderData, HeaderNavLink, HeaderNavLinkItem } from ".";
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
  links: HeaderNavLink[];
  className?: string;
}) {
  return (
    <nav aria-label="Primary" role="navigation">
      <NavigationMenu
        className={clsx("relative z-1 flex-col justify-center xl:flex", className)}
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
    </nav>
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

function NavigationMenuLinkWithMenu({ _title, href, sublinks }: HeaderNavLink) {
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
              if (sublink.children?.length) {
                return (
                  <li key={sublink._id} className="px-2 py-2">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-text-tertiary dark:text-dark-text-tertiary">
                      {sublink._title}
                    </p>
                    <ul className="mt-2 flex flex-col gap-1">
                      {sublink.children.map((child) => renderLeaf(child, getPreviewSrc))}
                    </ul>
                  </li>
                );
              }

              return renderLeaf(sublink, getPreviewSrc);
            })}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function renderLeaf(item: HeaderNavLinkItem, getPreviewSrc: (href: string) => string) {
  const { hrefValue, label } = resolveLinkMeta(item);
  if (!hrefValue) return null;

  return (
    <li key={item._id}>
      <NavigationMenuLinkPrimitive asChild>
        <ButtonLink
          unstyled
          className="hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150"
          href={hrefValue}
        >
                      <span className="truncate">{label}</span>
        </ButtonLink>
      </NavigationMenuLinkPrimitive>
    </li>
  );
}

function resolveLinkMeta(item: HeaderNavLinkItem) {
  const link = item.link;
  const directHref = item.href;

  let hrefValue: string | null = null;
  let label = item._title;

  if (link && link.__typename === "PageReferenceComponent" && link.page) {
    hrefValue = link.page.pathname;
    label = link.page._title;
  } else if (link && link.text) {
    hrefValue = link.text;
  } else if (directHref) {
    hrefValue = directHref;
  }

  return { hrefValue, label };
}

export function DesktopMenu({ navbar, rightCtas }: HeaderData) {
  return (
    <>
      <NavigationMenuHeader className="hidden xl:flex" links={navbar.items} />
      <div className="hidden items-center gap-2 justify-self-end xl:flex">
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

export function MobileMenu({ navbar, rightCtas }: HeaderData) {
  const { handleToggle, isOn, handleOff } = useToggleState();

  React.useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevWidth = body.style.width;

    if (isOn) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
    } else {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.width = prevWidth;
    };
  }, [isOn]);

  return (
    <>
      <button
        aria-label="Toggle menu"
        aria-expanded={isOn}
        aria-controls="mobile-navigation-panel"
        className="border-border bg-surface-secondary dark:border-dark-border dark:bg-dark-surface-secondary col-start-3 flex items-center justify-center gap-2 justify-self-end rounded-sm border p-2 xl:hidden xl:h-7"
        onClick={handleToggle}
      >
        <HamburgerMenuIcon className="size-4" />
      </button>
      <div className="block xl:hidden">
        {isOn ? (
          <div
            className="be-mobile-menu-backdrop fixed inset-0 z-[120] bg-surface-primary/95 dark:bg-dark-surface-primary/95"
            onClick={handleOff}
            style={{ height: "100dvh", width: "100vw" }}
          >
            <div
              id="mobile-navigation-panel"
              className="be-mobile-menu-card top-2 bottom-4 mx-auto max-w-md sm:max-w-lg rounded-2xl border border-border bg-surface-primary text-text-primary shadow-xl dark:border-dark-border dark:bg-dark-surface-primary dark:text-dark-text-primary"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <nav className="flex flex-col gap-1.5" aria-label="Mobile primary navigation">
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
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary"
                          href={link.href ?? "#"}
                          onClick={handleOff}
                        >
                          {link._title}
                        </Link>
                      ),
                    )}
                  </nav>
                </div>
                <div className="border-t border-border bg-surface-secondary/70 px-4 py-4 dark:border-dark-border dark:bg-dark-surface-secondary/70">
                  <div className="flex items-center justify-center gap-3 pb-3">
                    <figure className="flex flex-col items-center">
                      {/* light theme */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/nglcc-badge-dark.svg"
                        alt="NGLCC Certified"
                        height={16}
                        className="block h-4 w-auto dark:hidden"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* dark theme */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/nglcc-badge-light.svg"
                        alt="NGLCC Certified"
                        height={16}
                        className="hidden h-4 w-auto dark:block"
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption className="mt-1 text-center text-[8pt] text-text-tertiary dark:text-dark-text-tertiary">
                        Gay Mens Field Guide LLC.
                      </figcaption>
                    </figure>
                    {/* Catalant (theme-aware) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/catalant-badge-dark.svg"
                      alt="Catalant Vetted Consultant"
                      height={16}
                      className="block h-4 w-auto dark:hidden"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/catalant-badge-light.svg"
                      alt="Catalant Vetted Consultant"
                      height={16}
                      className="hidden h-4 w-auto dark:block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {rightCtas.items.map((cta) => (
                    <ButtonLink
                      key={cta._id}
                      href={cta.href}
                      intent={cta.type}
                      size="lg"
                      className="w-full justify-center"
                    >
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
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
  sublinks: HeaderNavLink["sublinks"]["items"];
  onClick: () => void;
}) {
  const { isOn, handleOff, handleOn } = useToggleState(false);
  const hasRendered = useHasRendered();
  const listRef = React.useRef<HTMLUListElement>(null);
  const submenuId = `${_id}-submenu`;

  // Removed animation logic to fix mobile menu visibility issue.
  // The height transition will be handled by CSS classes.
  React.useEffect(() => {
    if (!hasRendered) return;
    // The animation logic was removed.
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
      <button
        className="flex items-center gap-2 px-3 py-2.5 text-base font-medium"
        onClick={handleToggle}
        aria-expanded={isOn}
        aria-controls={submenuId}
        aria-haspopup="true"
      >
        {_title}
        <ChevronDownIcon
          className={clsx(
            "text-text-tertiary dark:text-dark-text-tertiary h-min transform transition-transform",
            isOn ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <ul
        id={submenuId}
        ref={listRef}
        className={clsx(
          "flex origin-top transform-gpu flex-col gap-2 pl-4 transition-all duration-300 ease-in-out",
          isOn ? "max-h-[500px] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden",
        )}
        aria-hidden={!isOn}
      >
        {sublinks.map((sublink) => {
          // Handle groups with children
          if (sublink.children && sublink.children.length > 0) {
            return (
              <li key={sublink._id} className="flex flex-col gap-2">
                <div className="text-text-secondary dark:text-dark-text-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {sublink._title}
                </div>
                <ul className="flex flex-col gap-1">
                  {sublink.children.map((child) => {
                    const childLink = child.link;
                    if (!childLink) {
                      return null;
                    }

                    const { href: childHref, _title: childTitle } =
                      childLink.__typename === "PageReferenceComponent" && childLink.page
                        ? {
                            href: childLink.page.pathname,
                            _title: childLink.page._title,
                          }
                        : {
                            href: childLink.text ?? "#",
                            _title: child._title,
                          };

                    const childHrefValue = childHref || "#";

                    return (
                      <li key={child._id}>
                        <Link
                          className="text-text-tertiary dark:text-dark-text-tertiary flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary"
                          href={childHrefValue}
                          onClick={onClick}
                        >
                          {childTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          // Handle direct links
          const link = sublink.link;
          if (!link) {
            return null;
          }

          const { href, _title } =
            link.__typename === "PageReferenceComponent" && link.page
              ? {
                  href: link.page.pathname,
                  _title: link.page._title,
                }
              : {
                  href: link.text ?? "#",
                  _title: sublink._title,
                };

          const hrefValue = href || "#";

          return (
            <li key={sublink._id}>
              <Link
                className="text-text-tertiary dark:text-dark-text-tertiary flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary"
                href={hrefValue}
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
