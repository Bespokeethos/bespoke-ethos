import Image from "next/image";
import Link from "next/link";

const FALLBACK_SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/bespoke-ethos",
    label: "LinkedIn",
    icon: "/assets/logo-square-light.png",
    url: "https://www.linkedin.com/company/bespoke-ethos",
  },
];

interface ChangelogLayoutProps {
  className?: string;
  contentClassName?: string;
  socialLinksTitle?: string;
  socialLinks?: Array<{ id?: string; href?: string; url?: string; label?: string; icon?: string }>;
  children?: React.ReactNode;
}

export function ChangelogLayout({
  className = "",
  contentClassName = "",
  socialLinks,
  socialLinksTitle,
  children,
}: ChangelogLayoutProps) {
  const resolvedLinks =
    socialLinks?.length && socialLinks.some((link) => link.href)
      ? socialLinks
      : FALLBACK_SOCIAL_LINKS;
  const resolvedTitle = socialLinksTitle ?? "Stay in the loop";

  return (
    <div
      className={`flex items-center justify-between border-b border-border dark:border-dark-border ${className}`}
    >
      <div
        className={`mx-auto flex w-full max-w-(--breakpoint-md) flex-col items-start justify-between gap-4 border-r border-border px-8 py-24 dark:border-dark-border md:flex-row md:items-center ${contentClassName}`}
      >
        {children}
        <div className="flex items-center gap-2 md:flex-col">
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            {resolvedTitle}
          </p>
          <div className="flex gap-2">
            {resolvedLinks.map((link) => {
              const href = link.href ?? link.url;
              if (!href) return null;

              return (
                <Link
                  key={href}
                  className="aspect-square hover:brightness-90"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={link.label ?? "Social link"}
                    height={18}
                    src={link.icon ?? "/assets/logo-square-light.png"}
                    width={18}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
