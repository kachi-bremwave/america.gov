# America.gov homepage — observation ledger (source vs preview)

Source observed 2026-11-02 at 1280x1800 and 390x844 (Playwright). Preview replayed at same sizes.

## Sections
| Item | Desktop | Phone | Notes |
|---|---|---|---|
| Gov banner, header (logo+flag, Menu btn) | pass | pass | flag restored via /site-assets/us-flag.svg (importer stripped original refs) |
| Hero: heading, subtitle, search card over rotating photo | pass | pass | search card + example marquee render; photo carousel assets local |
| Example cycler controls (prev / play-pause / next) | pass | pass | autoplay every 8s verified (Example 3 → Example 7); pause/resume toggles aria-label |
| Privacy / Clear answers / No-app sections | pass | pass | paired source/preview screenshots match |
| "More coming in 2027" roadmap (canvas artwork + pharmacy/campground map interactions) | pass | pass | static interactive artwork captured; canvas replaced by static fallback (importer) |
| Footer: big serif links, America.gov wordmark, GSA / laurels / NDS row, language select | pass | pass | language listbox was captured open — hidden now; collapsed "English ⌄" matches |

## Primary controls
| Control | Trigger | Expected | Observed | Status |
|---|---|---|---|---|
| Menu button | click | panel with 8 links + official-website card | all 8 links + card visible (3 items + card were captured at opacity 0 — repaired) | pass |
| Menu close / Escape | click / Esc | panel closes | closes | pass |
| Submit feedback (menu item) | click | modal: title, Add details textarea, disabled Submit, note | reconstructed from observed source open state; opens, Escape closes | pass |
| Submit feedback (footer) | click | same modal | opens | pass |
| "An official website" ⓘ trigger | click | "U.S. Government Websites" dialog | opens (was unwired); close button + Escape close | pass |
| Report government fraud pill | link | /fraud | href preserved on preview origin (page not imported) | pass (path preserved) |
| Nav links (How it works, Privacy, About, Coming soon, Releases, FAQ, Home) | link | same-site paths | all preserved: /how-it-works /privacy /about /coming-soon /releases /faq / | pass (pages not imported) |
| External links | link | unchanged | https://gsa.gov, https://ndstudio.gov unchanged | pass |
| Language select | select | collapsed English ⌄ | collapsed after hiding captured-open listbox | pass |
| Example cycler next/prev | click | slide flips | activeSlide toggles | pass |

## Static fallbacks / remaining gaps
- Roadmap section interactive canvas/map artwork is a static captured fallback (importer), matching visible contents.
- Header theme segmented control is visual only (theme switching not wired by import).
- Search/Ask inputs are display-only (no backend), matching the imported scope.
- Hero card shows a faint light-blue band at its top edge in preview (present in source at some transition states); minor.
