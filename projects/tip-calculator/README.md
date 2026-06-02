# Tip Calculator

Split a bill and add a tip. Enter the amount, pick a tip percentage, and choose
how many people are paying — it shows the tip, the total, and what each person
owes.

A small, self-contained React component. No external libraries, no build step.

## Load it into App Studio

Two ways, pick whichever suits you:

- **Load it straight in** — use [`tip-calculator.appstudio`](./tip-calculator.appstudio):
  in App Studio choose **Share → Import** and select the file, or drop it into
  your `App Studio Projects` folder. It arrives with its name and packaging
  metadata already set.
- **Copy-paste** — open [`tip-calculator.jsx`](./tip-calculator.jsx), copy its
  contents, then in App Studio: **New → paste → Run App**.

Click **Save** to keep it in your library, then package it as a desktop app if
you like.

## Make it yours

A few easy edits:

- Change the currency in the `money` helper (`currency: 'USD'`).
- Add or remove tip presets in the `[10, 15, 18, 20, 25]` list.
- Adjust the colors in the `styles` object.

Edit `tip-calculator.jsx` and re-import, or edit the `code` field inside
`tip-calculator.appstudio` directly (it's plain JSON). Keep the header comment
and the source link at the top of the source. See the
root [LICENSE](../../LICENSE) for the terms.
