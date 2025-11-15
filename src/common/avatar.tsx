"use client";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

import { CustomTooltip } from "./tooltip";

export interface AuthorImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface AuthorData {
  image: AuthorImage;
  title: string;
}

export function Author({
  image,
  title,
  ...props
}: AuthorData & Omit<ImageProps, "src" | "alt">) {
  return (
    <CustomTooltip content={title}>
      <Image
        alt={image.alt ?? `Avatar for ${title}`}
        className="size-8 rounded-full border-2 border-surface-primary object-cover transition-all dark:border-dark-surface-primary"
        height={image.height}
        src={image.url}
        width={image.width}
        {...props}
      />
    </CustomTooltip>
  );
}

export interface AvatarData {
  url: string;
  alt?: string;
}

export function Avatar({
  className,
  alt,
  url,
  ...props
}: AvatarData & Omit<ImageProps, "src" | "alt">) {
  return (
    <Image
      priority
      alt={alt ?? "Avatar"}
      className={clsx(
        "size-7 shrink-0 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary",
        className,
      )}
      height={28}
      src={url}
      width={28}
      {...props}
    />
  );
}
