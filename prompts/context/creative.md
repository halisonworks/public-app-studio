# Category context — Creative / generative

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a visual maker or
generator — handy for designers, marketers, and influencers making shareable
visuals.

## Upload or paste this into your AI

```
This project is a creative / generative tool. Shape it accordingly:

- The output is visual: build it with SVG or canvas, and generate something on
  load so the screen is never empty.
- Give a clear "regenerate / randomize" control, and where it makes sense,
  adjustable parameters (and a seed) so results are tweakable and reproducible.
- Let the user copy the useful output — hex codes, the SVG markup, the text — but
  do NOT build image export or print buttons; App Studio already provides PNG
  export and Print.
- Make the canvas the hero: one screen, responsive, with controls kept compact
  around it.
- Use only CDN fonts/icons for assets; no other external dependencies.
```

## Good fits

Color-palette / gradient generator, quote- or stat-card maker, social post /
infographic layout, SVG pattern or avatar generator, type-pairing previewer.
