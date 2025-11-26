# SPRINT-1: Analysis Summary (Internal Report)

## 1. `src/app/contact/page.tsx` (Contact Page)

| Feature | Current State | Line Numbers | Required Change |
| :--- | :--- | :--- | :--- |
| **Headline** | `"Tell us what you want off your plate."` | 56 | Replace with: `"Let’s fix the thing that’s keeping you up at night."` |
| **Intro Text** | `"You don’t need a 40-page strategy deck. You need clear next steps. Share where you’re stuck and what a win would look like, and we’ll respond with practical options-no pressure, no hard sell."` | 59-61 | Replace with: `"You don’t need a 40‑page deck. You need to know if this is fixable and what it costs. Tell me what’s broken. I read every email myself, and I’ll give you a straight answer—even if that answer is ‘don’t hire me, use this $20 tool instead.’"` |
| **Message Label** | `Message *` (Line 151), Placeholder: `"Tell us what’s on your plate and what a win would look like."` (Line 156) | 149-161 | Add sub-label: `"Don’t worry about jargon. Just describe the pain."` |
| **Success Message** | `<SuccessNotice>` component used, with text: `"Thanks! Your message is on its way. We’ll get back to you soon. Redirecting to the homepage."` | 103-107 | Update text to: `"Got it. I’m reading this shortly. No auto‑responder, just me."` (This will require modifying the text inside the `div` at line 103-105, or the `SuccessNotice` component if it contains the text). I will modify the text directly in `page.tsx` for simplicity. |
| **LGBTQ+ Callout** | Exists in a separate `Section` below the form. | 192-212 | Ensure it remains, and add the new note under the form. The existing card is good, but the request asks to add a note *under the form*. I will add the note near the form submission button. |
| **Mobile Layout** | No obvious `md:hidden` or `hidden` classes on the form fields themselves. The main content is hidden on mobile (Line 49: `hidden space-y-5 text-left md:block`). The form itself appears to be fully visible. The request to remove `hidden md:flex` or `md:hidden` for fields like `useCase` is not applicable as those fields are not in the form in `page.tsx`. I will ensure no fields are hidden. | N/A | Ensure all fields are visible. |
| **Turnstile** | **Not present** in `page.tsx`. The form does not include a Turnstile component or a hidden input for the token. | N/A | No client-side removal needed. |
| **Image** | `public/founder-upton-rand.jpg` is available. | N/A | Need to import and display as a circular avatar next to the new intro text. |

## 2. `src/app/api/contact/route.ts` (API Route)

| Feature | Current State | Line Numbers | Required Change |
| :--- | :--- | :--- | :--- |
| **Turnstile Logic** | Controlled by `process.env.CONTACT_ENABLE_TURNSTILE === "1"`. Checks for `cf-turnstile-response` token. | 156-183 | Remove the entire Turnstile verification block (Lines 156-183) and the `captchaToken` extraction (Line 146). |
| **Airtable Integration** | Uses `sendToAirtable` function (Line 291). Relies on env vars: `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME` (or similar fallbacks). | 355-514 | Keep intact. The goal is to ensure it still works after Turnstile removal. |
| **Form Submission** | Posts to `/api/contact` (Line 110 in `page.tsx`). | 84 | Keep intact. |

# SPRINT-2: Implementation Plan

The implementation will be split into two main file modifications:

## A. `src/app/contact/page.tsx` Changes

1.  **Update Headlines and Intro Text:** Replace existing text at lines 44, 45, 56, 57, 59-61 with the new copy.
2.  **Insert Founder Image and New Intro Text:** Modify the main text block (Lines 55-61) to include the new copy and the founder image as a circular avatar. This will require importing the image and adjusting the layout.
3.  **Update Message Field Label:** Add the sub-label to the `Message` field (Lines 149-161).
4.  **Update Success Message:** Change the text in the success notice block (Lines 103-105).
5.  **Add LGBTQ+ Note Under Form:** Insert the new LGBTQ+ note near the form submission button (around Line 185).
6.  **Remove Hidden Classes:** Review and remove any unnecessary `md:hidden` or `hidden` classes, specifically ensuring the main content block (Lines 49-99) is not hidden on mobile, or restructure to ensure the form is the focus. The form itself is not hidden.

## B. `src/app/api/contact/route.ts` Changes

1.  **Remove Turnstile Logic:** Delete the Turnstile verification block (Lines 156-183) and the `captchaToken` extraction (Line 146).
2.  **Confirm Airtable Integrity:** Verify that the `sendToAirtable` function remains correctly called and configured.

This plan directly addresses all points in SPRINT-2 and is based on the SPRINT-1 analysis.
