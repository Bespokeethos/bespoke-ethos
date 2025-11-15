"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { ButtonLink } from "@/common/button";
import { AvatarsGroup } from "@/common/avatars-group";
import { formatDate } from "@/utils/dates";

import type { ChangelogListItem } from "./changelog.fragment";

export function ChangelogList({ changelogPosts }: { changelogPosts: ChangelogListItem[] }) {
  const [activePostId, setActivePostId] = React.useState(changelogPosts[0]?.id ?? "");
  const [prevPostId, setPrevPostId] = React.useState(changelogPosts[0]?.id ?? "");
  const prevPostIdRef = React.useRef(activePostId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-post-id");
            if (postId) {
              setActivePostId(postId);
            }
          }
        });
      },
      { threshold: 1 },
    );

    document.querySelectorAll("[data-post-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [changelogPosts]);

  React.useEffect(() => {
    setPrevPostId(prevPostIdRef.current);
    prevPostIdRef.current = activePostId;
  }, [activePostId]);

  const activeIdx = changelogPosts.findIndex((post) => post.id === activePostId);
  const prevPostIdx = changelogPosts.findIndex((post) => post.id === prevPostId);

  return (
    <div className="flex w-full flex-col">
      {changelogPosts.map((post, idx) => (
        <div
          key={post.id}
          className="group flex w-full flex-col gap-4 md:flex-row"
          data-post-id={post.id}
        >
          <div className="relative flex w-[110px] shrink-0 items-start justify-between">
            <p
              className={clsx(
                "relative bottom-1.5 text-sm text-text-tertiary dark:text-dark-text-tertiary",
                post.id === activePostId && "text-accent-500!",
                prevPostIdx === activeIdx - 1 && "delay-500",
              )}
            >
              {formatDate(post.publishedAt ?? "")}
            </p>
            <div className="relative hidden h-full border-r border-border group-last:border-transparent dark:border-dark-border md:block">
              <div
                className={clsx(
                  "absolute -left-[3.5px] top-0 size-2 transform rounded-full bg-grayscale-400 shadow-neon shadow-grayscale-400/10 transition-all dark:bg-grayscale-600 dark:shadow-grayscale-600/20",
                  { "bg-accent-500! shadow-accent-500/10!": activeIdx >= idx },
                  { "delay-500": prevPostIdx === activeIdx - 1 },
                )}
              />
              <div
                className={clsx(
                  "absolute -left-0 top-0 z-10 h-full w-px origin-top scale-y-0 transform-gpu rounded-full bg-accent-500! shadow-accent-500/10! transition-transform duration-500 group-last:hidden",
                  activeIdx - 1 === idx && "scale-y-100",
                  activeIdx > idx && "scale-y-100 delay-150",
                )}
              />
            </div>
          </div>

          <article className="mb-16 flex flex-col gap-6">
            {post.image?.url ? (
              <Image
                alt={post.image.alt ?? post.title}
                blurDataURL={post.image.blurDataURL}
                className="rounded-lg border border-border object-cover dark:border-dark-border"
                height={post.image.height ?? 480}
                placeholder={post.image.blurDataURL ? "blur" : "empty"}
                priority={idx === 0}
                src={post.image.url}
                width={post.image.width ?? 647}
              />
            ) : (
              <div className="flex h-[280px] items-center justify-center rounded-lg border border-border text-sm text-text-tertiary dark:border-dark-border dark:text-dark-text-tertiary">
                Image coming soon
              </div>
            )}

            <div className="flex flex-col gap-1">
              <ButtonLink unstyled href={`/changelog/${post.slug}`}>
                <h2 className="text-xl font-medium">{post.title}</h2>
              </ButtonLink>
              {post.excerpt ? (
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary md:text-base">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <footer className="flex items-center justify-between">
              {post.authors.length > 1 ? (
                <AvatarsGroup animate>
                  {post.authors.map((author) => (
                    <AuthorAvatar author={author} key={author.id} />
                  ))}
                </AvatarsGroup>
              ) : post.authors[0] ? (
                <div className="flex items-center gap-2 rounded-full">
                  <AuthorAvatar author={post.authors[0]} />
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                    {post.authors[0].name}
                  </p>
                </div>
              ) : null}

              <ButtonLink
                href={`/changelog/${post.slug}`}
                icon={<ArrowRightIcon />}
                iconSide="right"
                intent="secondary"
                size="md"
                type="button"
              >
                Read more
              </ButtonLink>
            </footer>
          </article>
        </div>
      ))}
    </div>
  );
}

function AuthorAvatar({ author }: { author: ChangelogListItem["authors"][number] }) {
  if (!author.imageUrl) {
    return (
      <span className="flex size-8 items-center justify-center rounded-full border border-border text-xs uppercase dark:border-dark-border">
        {author.name?.[0] ?? "?"}
      </span>
    );
  }

  return (
    <Image
      alt={author.name ?? "Author"}
      className="size-8 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary"
      height={32}
      src={author.imageUrl}
      width={32}
    />
  );
}
