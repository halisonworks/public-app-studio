# Project file header

Every project's **source file** (`.jsx` / `.html`) starts with the same
intro/header comment: a one-line introduction, attribution, the link back to
this library, and the usage terms. Copy the block that matches your file type,
replace the two **`{{placeholders}}`**, and paste it at the very top of the
source file.

> **Note on `.appstudio` files.** A `.appstudio` project file is JSON, so it
> cannot carry a top-of-file comment. You do not add a header to it directly —
> put the header in the source code, and it travels inside the `.appstudio`
> file's `code` field automatically.

**Keep this header in place when you modify or redistribute a project.** See the
root [LICENSE](../LICENSE) for the full terms.

---

## For `.jsx` / `.js` files

```jsx
/**
 * {{Project Name}} — Halison App Studio example
 *
 * {{One-line description of what it does.}}
 *
 * From the Halison App Studio public library:
 * https://github.com/halisonworks/public-app-studio
 *
 * Permitted use: personal, educational, and other non-commercial use.
 * You may modify it, but keep this header and the source link intact, and do
 * not sell, commercialize, or republish it. Released under the Halison App
 * Studio Examples License — see the LICENSE file in the repository above.
 */
```

## For `.html` files

```html
<!--
  {{Project Name}} — Halison App Studio example

  {{One-line description of what it does.}}

  From the Halison App Studio public library:
  https://github.com/halisonworks/public-app-studio

  Permitted use: personal, educational, and other non-commercial use.
  You may modify it, but keep this header and the source link intact, and do
  not sell, commercialize, or republish it. Released under the Halison App
  Studio Examples License — see the LICENSE file in the repository above.
-->
```

---

## Notes

- Replace `{{Project Name}}` and the description line; leave everything else as
  is.
- The link must point at this library so users can find the source and terms.
- A short header is fine — don't paste the full license text into the file; the
  link to the LICENSE is enough.
