# Sales Dashboard

A KPI dashboard for a small SaaS: **MRR**, **active users**, **churn**, and
**NPS** cards, a 12-month MRR line chart, and a top-5 customers table.

A single default-exported **React component** that uses **`recharts`** for the
chart — App Studio auto-loads React and recharts, no setup. Category: **data /
dashboard**. (This is the library's example of the React + chart-library path.)

## Load it into App Studio

- **Load it straight in** — use [`sales-dashboard.appstudio`](./sales-dashboard.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`sales-dashboard.jsx`](./sales-dashboard.jsx), copy it
  all, then **New → paste → Run App**.

## Notes

- All data is mocked inline; there's **no backend, API key, or login**. `recharts`
  loads from `esm.sh` at runtime, so the first render needs a network.
- Made with the [data-dashboard](../../prompts/context/data-dashboard.md) add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
