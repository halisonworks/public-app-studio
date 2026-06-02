# Category context — Data / dashboard

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a metrics
dashboard built around charts and KPIs.

## Upload or paste this into your AI

```
This project is a data / dashboard tool. Shape it accordingly:

- Lead with the numbers: a responsive KPI grid at the top, then charts and
  tables below.
- For charts, use recharts (it auto-loads in App Studio) or hand-rolled inline
  SVG. Do not use any other chart library.
- Provide realistic mock data inline. Optionally let the user paste CSV or JSON
  to replace it, with forgiving parsing and a clear error state on bad input.
- Drive everything from a single state object: any input change recalculates and
  redraws all metrics at once.
- Always include empty and loading states, and guard every metric against NaN
  with sensible fallbacks.
- No backend or API keys. Data is mocked or pasted in — not fetched — unless a
  public, key-less API is the entire point, and then handle offline gracefully.
```

## Example

The [UX retention simulator](../examples/ux-retention-simulator.md) follows this
pattern: KPI cards, a custom SVG chart, a milestone table, and a single state
object that redraws everything on change. The
[sales dashboard](../../projects/data/sales-dashboard/) is the React + `recharts`
version built from this add-on.

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded, a
few lines like this is enough:

```
Build a sales KPI dashboard for a small SaaS, as a single default-exported React
component. Show four KPI cards (MRR, active users, churn, NPS), a line chart of
MRR over the last 12 months, and a table of the top 5 customers by revenue. Use
recharts for the chart and mock realistic data inline.
```

