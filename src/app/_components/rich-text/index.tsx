import Image from "next/image";
import clsx from "clsx";

import s from "./rich-text.module.scss";

export const richTextClasses = clsx(
  "prose prose-zinc max-w-prose text-start dark:prose-invert font-normal text-md w-full leading-relaxed",
  "prose-p:text-text-secondary dark:prose-p:text-dark-text-secondary",
  "prose-h1:text-4xl prose-h1:font-medium prose-h1:text-text-primary dark:prose-h1:text-dark-text-primary",
  "prose-h2:text-3xl prose-h2:font-medium prose-h2:text-text-primary dark:prose-h2:text-dark-text-primary",
  "prose-h3:text-2xl prose-h3:font-medium prose-h3:text-text-primary dark:prose-h3:text-dark-text-primary",
  "prose-blockquote:border-border prose-blockquote:pl-5 prose-blockquote:text-2xl prose-blockquote:text-text-primary dark:prose-blockquote:border-dark-border dark:prose-blockquote:text-dark-text-primary",
  '[&_blockquote>p]:before:[content:""] [&_blockquote>p]:prose-blockquote:after:[content:""]',
  "prose-h4:text-2xl prose-h4:font-medium",
  "prose-strong:font-medium",
  "prose-a:outline-accent-500 dark:prose-a:text-accent-400 prose-a:text-accent-600 prose-a:no-underline prose-a:hover:underline prose-a:decoration-accent-500/50",
  "prose-pre:pl-0",
  s["rich-text"],
);

export function RichTextImage(props: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  return (
    <figure className="relative flex flex-col gap-2">
      <Image alt={props.caption ?? ""} {...props} />
      {props.caption ? (
        <figcaption className="m-0 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function RichTextVideo(props: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  return (
    <figure className="relative flex flex-col gap-2">
      <video controls>
        <source src={props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {props.caption ? (
        <figcaption className="m-0 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
