# Consolidated Task List: Bespoke Ethos Sanity.io Migration

This document provides a clear, actionable plan to complete the migration of the Bespoke Ethos website from BaseHub to Sanity.io. It consolidates information from all provided documents and the current state of the GitHub repository.

## Current Status

- **Project:** `bespoke-ethos`
- **Problem:** The website at [www.bespokeethos.com](https://www.bespokeethos.com) is live but displays a runtime error due to a faulty integration with the BaseHub CMS.
- **Solution:** The consensus from the provided documentation is to migrate the CMS to Sanity.io.
- **Completed Work:** A previous agent ("Codex") has already performed a verification of the Airtable integration, as detailed in `Verification_Report_COMPLETED.md`.

## Migration Plan

This plan is divided into two sprints, as outlined in the original `sprint_roadmap.md` and `BespokeEthos_TheFounder-FocusedConversionAttackPlan.md`.

### Sprint 1: Sanity Setup & Initial Integration (2-3 hours)

**Goal:** Establish a basic Sanity.io project and connect it to the Next.js application.

| Task | Description | Status |
|---|---|---|
| **1.1: Create Sanity Project** | Create a new Sanity.io project and a new dataset. | ⬜️ Not Started |
| **1.2: Define Sanity Schema** | Define the schema for the changelog posts within the Sanity Studio. | ⬜️ Not Started |
| **1.3: Install Sanity Client** | Install the necessary Sanity client libraries in the Next.js project. | ⬜️ Not Started |
| **1.4: Connect to Sanity** | Configure the Next.js application to connect to the Sanity project using the newly installed client. | ⬜️ Not Started |
| **1.5: Fetch Changelog Data** | Fetch the changelog data from Sanity and display it on the changelog page. | ⬜️ Not Started |

### Sprint 2: Full Migration & BaseHub Removal (2-3 hours)

**Goal:** Migrate all content from BaseHub to Sanity and completely remove all traces of BaseHub from the codebase.

| Task | Description | Status |
|---|---|---|
| **2.1: Migrate Content** | Manually migrate the existing changelog posts from BaseHub to the new Sanity.io dataset. | ⬜️ Not Started |
| **2.2: Update Changelog Page** | Update the main changelog page (`src/app/changelog/page.tsx`) to use the data fetched from Sanity and remove all BaseHub-related code. (In progress: SKIP_REMOTE_DATA now serves a stable fallback that avoids BaseHub at build/runtime.) | ⬜️ Not Started |
| **2.3: Update Changelog Slug Page** | Update the individual changelog post page (`src/app/changelog/[slug]/page.tsx`) to use Sanity data and remove all BaseHub-related code. (In progress: SKIP_REMOTE_DATA now short-circuits BaseHub access and renders a safe fallback.) | ⬜️ Not Started |
| **2.4: Remove BaseHub Dependencies** | Uninstall all BaseHub packages from `package.json` and run `pnpm install` to update the lockfile. | ⬜️ Not Started |
| **2.5: Final Testing** | Thoroughly test the changelog pages to ensure they are functioning correctly with the new Sanity.io data source. | ⬜️ Not Started |

### Post-Sprint: Cleanup & Optimization

- **Remove `SKIP_REMOTE_DATA`**: Remove the `SKIP_REMOTE_DATA` environment variable and any related code, as it will no longer be necessary.
- **Update Documentation**: Update the `README.md` and `DEPLOYMENT.md` files to reflect the new Sanity.io integration.
- **Vercel Environment Variables**: Ensure that the `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_TOKEN` environment variables are correctly set in the Vercel project settings.

## Next Steps

1.  **Review and Approve:** Please review this consolidated plan. Once you approve, I will begin with Sprint 1.
2.  **Provide Credentials:** During the process, I will require the necessary credentials for Sanity.io as they are generated.
