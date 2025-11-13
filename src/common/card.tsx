import clsx from "clsx";
import React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <article className={clsx("be-card p-5", className)}>{children}</article>;
}

export function CardHeader({
  title,
  iconSrc,
  Icon,
  badgeRight,
}: {
  title: React.ReactNode;
  iconSrc?: string | null;
  Icon?: React.ComponentType<{ className?: string }>;
  badgeRight?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="" className="h-8 w-8 rounded-md" />
      ) : Icon ? (
        <span className="be-card-icon" aria-hidden>
          <Icon className="h-4 w-4" />
        </span>
      ) : (
        <span className="be-card-icon" aria-hidden />
      )}
      <h2 className="text-xl font-medium leading-tight">{title}</h2>
      {badgeRight ? <span className="ml-2">{badgeRight}</span> : null}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("mt-1 text-text-secondary dark:text-dark-text-secondary", className)}>{children}</div>;
}

export function CardActions({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("mt-3", className)}>{children}</div>;
}

