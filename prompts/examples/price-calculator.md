# Example prompt — Interactive price calculator

A worked example of a comprehensive, production-ready prompt: a single-file
interactive price calculator for a Norwegian upper-secondary course (*Sales,
Service and Tourism*) that doubles as a tool for small businesses.

This is a **full HTML page** example. This version renders an **English UI**; a
Norwegian version (Norwegian UI strings) is in
[`i18n/nb/price-calculator.md`](./i18n/nb/price-calculator.md).

> **App Studio note.** This prompt loads Tailwind from a CDN. That's fine for an
> App Studio project — pulling static front-end assets (a CSS framework, fonts,
> images) is allowed; what a project must *not* depend on is a runtime service
> (backend, API keys, login, or an LLM). See
> [`../authoring-guide.md`](../authoring-guide.md).
>
> A ready-to-run build of this example lives in
> [`projects/price-calculator/`](../../projects/price-calculator/).

---

## Simple version

Upload [`../authoring-guide.md`](../authoring-guide.md) and the
[`../context/educational.md`](../context/educational.md) add-on to your AI first
(they carry the App Studio rules and the teaching shape), then a few lines like
this is enough — this is close to how the example was actually made. The AI
(e.g. Google Gemini) fills in the styling and details. Use the detailed prompt
below only when you want precise control.

```
Build a single self-contained HTML page: an interactive retail price calculator
for a Norwegian context (currency `kr`). Let me enter a cost price, pick a VAT
rate (25 / 15 / 12 / 0%), and set a markup % that stays linked to the
contribution-margin %. Show the selling price excl. and incl. VAT, the
contribution margin, and the VAT amount, with a visual price breakdown. Add a
discount simulator and a break-even view. Make it clean and responsive, all in
one file.
```

## The prompt

````
You are a senior frontend developer and instructional designer. You will code
a complete, self-contained, production-ready interactive price calculator in a
single HTML file.

The application will be used both as an interactive teaching aid for
upper-secondary students (Sales, Service and Tourism) and as a professional
tool for small businesses / entrepreneurs. It must work flawlessly when
embedded in an iframe inside an LMS such as Canvas.

## CRITICAL DESIGN RULES
1. **ABSOLUTELY NO EXTERNAL/INTERNAL ICONS:** Using FontAwesome, Lucide,
   Google Icons, SVG icons, or emoji as icons is strictly forbidden. The
   interface must be extremely clean, tidy, and professional — driven solely
   by elegant typography (Inter-like sans-serif), color contrast, borders, and
   simple CSS dots (e.g. `rounded-full`) for color coding.
2. **RESPONSIVENESS:** The layout must scale seamlessly from small mobile
   screens to large projectors / smart boards. No horizontal scrolling.
3. **DESIGN TOKENS:** Use Tailwind CSS via CDN. The palette should be calm and
   modern: Slate (gray-blue) as the base theme, Emerald for margins and
   contribution, and Indigo for VAT-related elements.

---

## FUNCTIONAL REQUIREMENTS AND FORMULAS

### 1. Input panel (left side)
* **Purchase price (kr):** A number field (`type="number"`) with a default of
  `100` kr.
* **VAT rate:** Four large, easy-to-tap buttons (25% for goods, 15% for food,
  12% for tourism, 0% for exempt).
* **Markup % (Avanse) (slider 0–300% + number field):** Calculated from the
  purchase price.
  * Formula: `Selling price excl. VAT = Purchase price * (1 + Markup / 100)`
* **Contribution margin ratio % (Dekningsgrad) (slider 0–95% + number field):**
  Calculated from the selling price excl. VAT.
  * Formula: `Selling price excl. VAT = Purchase price / (1 - Margin ratio / 100)`
* **Bi-directional binding:** If the user changes the markup slider or its
  number field, the contribution margin ratio must immediately recompute and
  update in the UI, and vice versa. Everything happens in real time with no
  delay.

### 2. Result panel and visualization (right side)
* **Four large number cards:**
  * Selling price excl. VAT
  * Contribution margin in kroner (Selling price excl. VAT minus purchase price)
  * VAT amount in kroner
  * Selling price incl. VAT (what the customer pays at the register)
* **Visual price breakdown (dynamic bar):** A horizontal, color-coded bar
  showing the breakdown of the checkout price in percent.
  * Purchase (gray)
  * Contribution margin (emerald)
  * VAT (indigo)
  * The percentages update dynamically and show each part's share of the
    *total price the customer actually pays* (they must sum to 100%).

---

### 3. Discount simulator (lower section)
* Show three cards for price cuts of 10%, 20%, and 30% respectively.
* For each discount rate, compute:
  * The new selling price the customer pays.
  * The new contribution margin in kroner.
  * The percentage reduction in the contribution margin. Formula:
    `((Original CM - New CM) / Original CM) * 100`.
  * *Note:* If the new contribution margin becomes negative, mark it clearly
    with `(BELOW COST)` and color it red.
* Include an instructional warning explaining that discounts eat solely into
  the margin, since the supplier is paid exactly the same for the item
  regardless.

### 4. Mode switching (School vs Business)
* Buttons at the top let the user switch between "School mode" and
  "Business mode".
* **In School mode:** Show a theory section explaining the financial formulas,
  plus a section with 3 practical, cross-disciplinary student challenges
  (clothing store, hotel, café).
* **In Business mode:** Hide the school exercises and show a **break-even
  analysis (Nullpunktsanalyse)**.
  * The user can enter their monthly fixed costs (default: 50 000 kr).
  * The system computes the **break-even volume**
    (`Fixed costs / contribution margin per unit`) and **break-even revenue**
    (`Fixed costs / (Margin ratio % / 100)`) in real time.

---

### 5. Presentation mode (full-screen single-page view)
* An eye-catching button labelled "Start presentation mode".
* On activation, a full-screen dark overlay opens
  (`fixed inset-0 bg-slate-950 z-50 overflow-hidden`) that **removes all input
  fields, sliders, navigation, footers, help texts, and settings**.
* **This single-page view must contain only:**
  * A clean top bar showing the status of the current VAT rate and margin ratio.
  * The 4 large result numbers in gigantic, highly legible fonts suited to
    projector viewing.
  * The color-coded bar chart in an enlarged version centered on screen, with
    large white percentages for each share.
* **Floating info toast:** A discreet, modern info box at the top of the screen
  reading: `"Presentation mode active | Press the ESC key to go back"`.
  This box must have a CSS transition and automatically fade out completely
  (`opacity-0`) after exactly **5 seconds**.
* **Keyboard event:** JavaScript must listen globally for the `Escape` key.
  When pressed, presentation mode closes immediately and returns the user to
  the calculator.

---

## TECHNICAL STRUCTURE (source template)

Build the application with the following structure. Make sure all CSS styling,
Tailwind configuration, and JavaScript are baked into this single file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Price Calculator: Markup, Contribution & VAT</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        input[type="range"]::-webkit-slider-thumb { background: #4f46e5; cursor: pointer; }
        input[type="range"]::-moz-range-thumb { background: #4f46e5; cursor: pointer; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen font-sans">
    <!-- MAIN VIEW -->
    <div id="main-calculator-view" class="block">
         <!-- Top bar, mode buttons, controls, charts, simulator, and school/business sections -->
    </div>

    <!-- PRESENTATION MODE OVERLAY -->
    <div id="presentation-overlay" class="hidden">
         <!-- Only large numbers and the giant chart, no input fields -->
    </div>

    <script>
         // JavaScript logic for two-way sync of sliders,
         // discount calculations, break-even volume, and presentation-mode
         // control (ESC key + 5 s toast)
    </script>
</body>
</html>
```
````
