# CHIROMANTIA — changelog
## 1.1 (it.1)
- Build pipeline (src/js, src/css, src/data → dist/chiromantia.html), validators, Playwright smoke test.
- Content audit: hedged "in tradition" wording; 68 ro/en fixes; 224 fixes across fr/it/es/pt/de/hu; ro "Munți".
- Hand drawing: fate line under Saturn, heart line below mounts, equal index/ring, shorter thumb.
- A11y: focus kept across re-render, live region, roving tabindex + arrow keys, aria-pressed/current, visible focus, 44 px targets, contrast of controls, reduced motion, print in dark theme.
- Nav wraps (no horizontal scroll); selection persisted; saved state validated; CSP meta.
## 1.2 (it.2)
- 7 minor lines (Girdle of Venus, intuition, bracelets, relationship, Ring of Solomon, travel, Mars line) in 8 languages; optional "Minor lines" layer, auto-enabled when selected.

## 1.3
- It.4: 7 extended hand types (d'Arpentigny-style), proportions calculator (length/width/middle finger), "use in guided reading"; numeric input state validated; INP registry for input events.
- Modules split: fingers, derm, measurements, science (activate when data files exist).

## 1.4
- It.3: "Fingers & nails" tab (fingertips, nails, joints, gaps, phalanges, thumb) with SVG icons.
- It.5: Measurements tab – 2D:4D ratio with single-population reference (Xi et al. 2014) and z-score; method notes.
- It.6: Fingerprints & creases tab with pattern icons, facts, Sydney/simian crease notes and a local tally vs. typical ranges.
- It.7: Science & critical thinking tab – evidence levels 0–3, Barnum/Forer demo, cold-reading techniques.

## 2.0 (iterations 8–20)
- Guided reading v2: two hands with comparison, 3 extra lines, 7 mounts, saved profiles (max 12), JSON export/import.
- Life-line timeline (folk belief, with scientific caveat); photo annotation (local only, PNG export, draw mode); quiz (40 questions); glossary (45 terms); global search; hash deep links.
- Ethics/limits and credits in About; badges, sticky top bar, pill nav; forced-colors support; contrast fixes for dark theme.
- Security: prototype-safe lookups, validated storage/import, megapixel cap; PWA (manifest + service worker over http(s)), LICENSE MIT, 8 READMEs.
- Audits: content (facts, calculator thresholds recalibrated to 1.25 / 0.80), i18n (80 fixes, PT-PT, du/vous), code/a11y.
- 2.0.1: line hit-areas narrowed + nearest-line picking (72/72 clicks correct), theme-aware evidence-level colors, fingerprint reference ranges aligned with text, source included in package.
- 2.1: photo tab: local alignment template (hand outline + lines) with keyboard-accessible sliders (move, size, rotation, opacity, mirror), camera capture button; sticky canvas on mobile. No automatic detection.

## 2.2
- New tabs: Beginner (5-step guide, default for new users), Flashcards (Leitner spaced repetition over entries, signs, glossary), Map game (tap the named line/mount/finger, with a keyboard/screen-reader list alternative), Cheat sheet (printable).
- Study progress per entry; read aloud (browser speech synthesis); measurement log with means and sparkline; reader: profile notes, two-profile comparison, save reading as PNG image.
- Accessibility: text size (100/115/130 %), high-contrast mode, collapsible mobile menu.

## 2.3
- Measure from photo (card-calibrated, keyboard-operable crosshair), measurement-uncertainty simulation (calculator and 2D:4D), blind test (Barnum self-experiment), procedural fingerprint trainer, testable predictions with due-date banner, printable 1:1 worksheet, "listen to the map" (WebAudio) with spoken-style description, share link + QR (qrcode-generator, MIT), cold-reading simulator, history of chirology.

## 2.4
- Fix: calibrated-photo points were misplaced on portrait images (letterbox); plausibility limits on measured lengths.
- Fix: `esc()` now escapes quotes (attribute injection in predictions).
- Shared links no longer silently overwrite your own reading (backup profile created; hashchange handled).
- Cold-reading simulator shuffles options; fingerprint "loop" generator redrawn; focus moved to result after answers; audio stops on tab change.
- History/science data corrections (Cummins–Midlo 1943, Richards et al. 2021, Forer 4.26 consistent, wording on India/China sources).
- Translation fixes (hu, pt, de, "listen to the map"), full 8-language `shareNote`; README feature lists in 8 languages.
- New texts: sim purpose note, blind-test sample caveat, photo perspective warning, local-file share notice (shLocal), prediction limit (pdFull); shared links hidden on file://.
- Cold-reading simulator: fr/pt now use the formal register consistently with the UI; history dates language-neutral.

## 2.5
- Aligned with fff-kit: transparency label (#app-version), strict CSP with script hashes, app.json, application-version/last-updated meta.
- A11y (axe 0 violations, 8 scenarios): HC button accessible name contains its visible text; badges inside a labelled region.
- tests/suite.test.mjs runs validate.py and the standalone Playwright tests.
