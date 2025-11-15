import Image from "next/image";
import Link, { type LinkProps } from "next/link";

export async function FormLayout({
  children,
  title,
  subtitle,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) {
  const fallbackLogo = (
    <Image alt="Bespoke Ethos logo" className="size-8 self-start" height={32} src="/assets/logo-mobile.png" width={32} />
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-surface-secondary bg-surface-primary p-5 shadow-md dark:border-dark-border dark:bg-dark-surface-secondary dark:shadow-none">
      <header className="flex flex-col gap-3">
        {fallbackLogo}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">{title}</h1>
          <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {subtitle}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export function RichTextFormWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function CustomAnchor({
  children,
  ...props
}: React.AllHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link className="text-accent-500 hover:underline" {...props}>
      {children}
    </Link>
  );
}
