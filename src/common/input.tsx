import clsx from "clsx";
import { useId } from "react";

import { Button } from "./button";

export function Input({
  className,
  disabled,
  error,
  buttonContent = "Submit",
  id,
  name,
  ...props
}: Omit<React.ComponentProps<"input">, "id" | "name"> & {
  id?: string;
  name?: string;
  error?: string | null;
  buttonContent?: string;
}) {
  const generatedId = useId();
  const inputId = id ?? (name ? `${name}-field` : generatedId);
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="relative">
      <input
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={clsx(
          "h-9 w-full rounded-full border border-border py-2 pl-4 pr-28 dark:border-dark-border md:h-11",
          "disabled:opacity-50",
          "placeholder:text-sm placeholder:text-text-tertiary dark:placeholder-dark-text-tertiary",
          "text-sm text-text-primary dark:text-dark-text-primary",
          "outline-hidden focus-visible:ring-2 focus-visible:ring-control",
          error ? "text-error placeholder:text-error/50" : "",
          className,
        )}
        disabled={disabled}
        {...props}
      />
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="dark:text-dark-error absolute -bottom-5 left-4 text-xs text-error"
        >
          {error}
        </p>
      ) : null}
      <Button
        className={clsx(
          "absolute right-1 top-1 h-8 px-4 text-xs peer-disabled:opacity-50 md:right-1.5 md:top-1.5 md:h-9 md:px-5",
          error && "opacity-50",
        )}
        disabled={disabled}
        intent="tertiary"
        size="md"
        type="submit"
      >
        {buttonContent}
      </Button>
    </div>
  );
}
