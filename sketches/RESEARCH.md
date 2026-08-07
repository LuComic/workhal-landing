# Chaos to Clarity refinement notes

This is a static design study, not a production front-end implementation.

## Applied principles

- Responsive section spacing uses bounded `clamp()` values and mobile breakpoints.
- Page gutters scale from roughly `20px` to `80px`.
- Body copy stays within a readable measure and uses unitless line-height around `1.6–1.7`.
- Display typography scales with bounded fluid values.
- The page follows promise → before/after → product proof → process → reassurance → final CTA.
- Shared controls have a minimum height of `44px`.
- Static cards and product mockups do not react to hover. Motion is reserved for controls and decorative chaos notes.

## Type and color

- **Manrope** handles display and body copy.
- **Space Mono** is limited to statuses and product metadata.
- The primary brand color is **`#00786F`**. Mint and blush are supporting state tints.

## Sources

- [web.dev — Typography](https://web.dev/learn/design/typography)
- [GOV.UK Design System — Spacing](https://design-system.service.gov.uk/styles/spacing/)
- [U.S. Web Design System — Measure](https://designsystem.digital.gov/design-tokens/typesetting/measure/)
- [Google Fonts Knowledge — Pairing typefaces](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces)
- [Nielsen Norman Group — 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
