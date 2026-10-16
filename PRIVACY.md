# Privacy Policy, KIT Apps

_Last updated: 2026-05-30_

KIT Apps is a local-first desktop and web app for turning AI-generated code into runnable apps. It has **no account system and no backend**. Your canvases, code, and files stay on your device (browser `localStorage` or local filesystem). This policy explains the one exception: anonymous product usage analytics.

## Summary

- **No personal data.** We do not collect your name, email, IP address, or any of your content (code, canvases, file names).
- **Anonymous, aggregate analytics only.** A small set of named product events (for example "app launched", "canvas saved") with non-identifying properties.
- **On by default for everyone, and anonymous.** Because the data is not personal data, the lawful basis is legitimate interest, not consent.
- **Two ways to stop it:** **Do Not Track / Global Privacy Control** turns analytics off for anyone, at no cost; and an in-app **opt-out switch in Settings** is available on the **paid tier**. Free users always keep the browser-signal path.
- **EU-hosted.** Analytics are processed by PostHog on EU infrastructure.
- **No cookies, no cross-site tracking, no ads, no session recording.**

## Who is responsible for this data

The data controller for the processing described in this policy is:

**Metanoia AS**
Organisation number 928 285 898
Kvednanesvegen 49, 4120 Tau, Norway
<appstudio@halison.io>

KIT Apps and the "Halison" / "Halison.io" names are products and brands of Metanoia AS; the legal entity answerable for this data is Metanoia AS.

PostHog acts as our **processor**, processing analytics data on our instruction and not for its own purposes.

## What we collect

When analytics are enabled, KIT Apps sends named product events to understand how the app is used and where people get stuck. The complete event list lives in code (`src/utils/telemetry.js`, the `EVENTS` object) and currently is:

| Event | Non-identifying properties |
|-------|----------------------------|
| `app_launched` | `context` (`desktop` / `web`) |
| `canvas_paste_started` | `has_initial_code` (boolean) |
| `canvas_saved` | `source`, `size` (enum), `total_canvases`, `categorized` (boolean) |
| `canvas_loaded` | `source`, `size` (enum) |
| `canvas_rendered` | none |
| `canvas_render_failed` | none (no error text) |
| `canvas_renamed` / `canvas_duplicated` / `canvas_deleted` | `total_canvases` (count) |
| `canvas_exported` | `size` (enum) |
| `packaging_opened` | none |
| `installer_build_started` | none |
| `installer_build_phase` | `phase` (e.g. `building`) |
| `installer_build_succeeded` | `duration_seconds` |
| `installer_build_failed` | `duration_seconds`, `error_hint` (enum category, no error text) |
| `installer_build_cancelled` | `duration_seconds` |
| `export_png` / `export_pdf` | `paid` (boolean) |
| `share_opened` | `paid` (boolean) |
| `onboarding_completed` | none |

Properties are limited to booleans and short enums. They never contain your code, file names, paths, or any free text.

## What we do NOT collect

- No personal data (name, email, account, device ID).
- **No IP address.** The client nulls the IP before sending, and the project is configured to discard client IP data. No geolocation.
- **No persistent identifier.** Analytics use in-memory storage only (`persistence: 'memory'`), so nothing is written to your device for analytics and there is no stable cross-session ID.
- No autocapture, no page views, no clicks, no session replay, no surveys.
- None of your content (canvas code, HTML, file paths).

## Legal basis (GDPR / ePrivacy)

Because the analytics are cookieless (no information is stored on or read from your device), carry no IP and no identifier, strip your content, and are used only in aggregate to improve the product, the data is **not personal data**. The lawful basis is therefore **legitimate interest** (GDPR Art 6(1)(f)), not consent; there is no personal record to consent to or withdraw. We still give you control: we honor **Do Not Track / Global Privacy Control** for everyone (a no-cost off switch), and the paid tier adds an in-app opt-out in Settings. We do not use the data for advertising, profiling, or automated decisions, and an opt-out only ever reduces collection, it never turns on any identified or persistent mode.

## Processor and data location

Analytics are processed by **PostHog** acting as our data processor, on **EU** infrastructure (`eu.i.posthog.com`). Data is retained for the minimum period needed to spot product trends and is then deleted per the configured retention window.

## In-app feedback

KIT Apps includes an optional feedback widget. Feedback is **only sent when you explicitly click the submit button** — nothing is collected automatically. When you submit feedback, your message and the current app version are transmitted to **Supabase** (acting as a sub-processor), which stores them on EU infrastructure for Metanoia AS to review.

Feedback submissions may contain personal information you choose to include in your message. The lawful basis is **legitimate interest** (GDPR Art 6(1)(f)) — reviewing direct user input to improve the product. Submissions are not linked to your analytics data; the two systems are independent.

To request deletion of a specific submission, write to <appstudio@halison.io>. Because submissions include your message text, we can locate and delete them on request.

## Your choices and rights

- **Browser signal (everyone, free):** enabling Do Not Track or Global Privacy Control disables analytics automatically, on any tier and at no cost.
- **In-app opt-out (paid tier):** open **Settings** (gear icon) and turn **Usage analytics** off. This takes effect immediately and persists. Free users see the disclosure with the switch locked; the browser-signal path above remains available to them.
- Because the data is anonymous and carries no identifier, we cannot link any event back to you, which means we cannot service individual access or erasure requests against it; there is simply no personal record to find. You remain in full control via the opt-out.

## Children

KIT Apps is not directed at children and does not knowingly collect data from them.

## Changes

We will update this document if the data practices change, and note it in the changelog. Material changes are reflected in the in-app notice.

## Contact

For any question about this policy, or to exercise a data protection right, write to <appstudio@halison.io>, or to Metanoia AS, Kvednanesvegen 49, 4120 Tau, Norway.

Questions about the product itself: open an issue on the public repository.
