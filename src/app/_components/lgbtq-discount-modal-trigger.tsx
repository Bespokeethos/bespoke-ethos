"use client";

import * as React from "react";
import Link from "next/link";

type LGBTQDiscountModalTriggerProps = {
  children?: React.ReactNode;
};

export function LGBTQDiscountModalTrigger({ children }: LGBTQDiscountModalTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Return focus to the trigger after close
    window.setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  // Trap focus inside the modal when open
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const container = modalRef.current;
      if (!container) return;

      const focusableSelectors =
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const allFocusable = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((el) => !el.hasAttribute("aria-hidden"));

      if (!allFocusable.length) {
        return;
      }

      const [first, ...rest] = allFocusable;
      if (!first) return;
      const last = rest[rest.length - 1] ?? first;
      const active = document.activeElement as HTMLElement | null;

      if (!active || !container.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Ensure focus moves inside the modal on open
  React.useEffect(() => {
    if (!isOpen) return;
    const container = modalRef.current;
    if (!container) return;

    const focusableSelectors =
      'button:not([disabled]), a[href], textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = container.querySelector<HTMLElement>(focusableSelectors);
    focusable?.focus();
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="lgbtq-discount-btn"
        onClick={openModal}
      >
        {children ?? "Find Out More"}
      </button>

      {isOpen ? (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            ref={modalRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label="LGBTQ discount information"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close LGBTQ discount information"
              onClick={closeModal}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "var(--charcoal-text)",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              25% Off for LGBTQ+ Small Business Owners
            </h2>

            <p
              style={{
                fontSize: "20px",
                color: "var(--muted-text)",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              We know what it’s like to build a business while navigating the unique challenges our
              community faces. We’ve been there. Still are, actually.
            </p>

            <p
              style={{
                fontSize: "20px",
                color: "var(--muted-text)",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              That’s why we offer{" "}
              <strong style={{ color: "var(--charcoal-text)" }}>
                25% off all upfront project costs
              </strong>{" "}
              to LGBTQ+-owned small businesses.
            </p>

            <div
              style={{
                backgroundColor: "var(--cream-bg)",
                padding: "24px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--charcoal-text)",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                What’s Included:
              </p>
              <ul
                style={{
                  fontSize: "18px",
                  color: "var(--muted-text)",
                  lineHeight: 1.8,
                  paddingLeft: "20px",
                  margin: 0,
                }}
              >
                <li>25% off initial consultation fees (beyond the free 30-minute call)</li>
                <li>25% off project setup and implementation costs</li>
                <li>25% off custom AI model training</li>
                <li>25% off one-time development work</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: "var(--navy-primary)",
                padding: "24px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#ffffff",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                What’s Not Included:
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#ffffff",
                  opacity: 0.9,
                  margin: 0,
                }}
              >
                Monthly subscription fees for ongoing services (API costs, hosting, maintenance).
                Those are charged at standard rates to keep our lights on.
              </p>
            </div>

            <p
              className="hidden md:block"
              style={{
                fontSize: "18px",
                color: "var(--muted-text)",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              <strong style={{ color: "var(--charcoal-text)" }}>How to claim:</strong> Just mention
              you’re an LGBTQ+-owned business during your free consultation. We’ll ask for simple
              verification (business registration, NGLCC certification if you have it, or other
              documentation). No hoops to jump through—we’re not here to gatekeep, just to support
              our community.
            </p>

            <p
              className="md:hidden"
              style={{
                fontSize: "16px",
                color: "var(--muted-text)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              <strong style={{ color: "var(--charcoal-text)" }}>How to claim:</strong> Mention
              you’re an LGBTQ+-owned business during your free consultation. We’ll ask for simple,
              one-time verification. No hoops or gatekeeping.
            </p>

            <p
              style={{
                fontSize: "18px",
                color: "var(--muted-text)",
                lineHeight: 1.8,
                marginBottom: "28px",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              We’re NGLCC-certified ourselves. We know the journey. Let’s build something together.
            </p>

            <div style={{ textAlign: "center" }}>
              <Link
                href="/contact?service=llm-setups"
                className="primary-cta inline-block"
                onClick={closeModal}
              >
                Schedule Your Free Consultation
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
