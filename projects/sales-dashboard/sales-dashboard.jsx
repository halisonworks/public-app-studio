/**
 * Sales Dashboard — Halison App Studio example
 *
 * A small-SaaS KPI dashboard: MRR / active users / churn / NPS cards, a 12-month
 * MRR line chart (recharts), and a top-5 customers table. Mock data, single
 * default-exported React component.
 *
 * From the Halison App Studio public library:
 * https://github.com/halisonworks/public-app-studio
 *
 * Permitted use: personal, educational, and other non-commercial use. Keep this
 * header and the source link intact; non-commercial only. Released under the
 * Halison App Studio Examples License — see the LICENSE file in the repo above.
 */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const mrrHistory = [
  { month: 'Jul', mrr: 41200 },
  { month: 'Aug', mrr: 43800 },
  { month: 'Sep', mrr: 45100 },
  { month: 'Oct', mrr: 47600 },
  { month: 'Nov', mrr: 49300 },
  { month: 'Dec', mrr: 51000 },
  { month: 'Jan', mrr: 52400 },
  { month: 'Feb', mrr: 54900 },
  { month: 'Mar', mrr: 57200 },
  { month: 'Apr', mrr: 59800 },
  { month: 'May', mrr: 62500 },
  { month: 'Jun', mrr: 65340 },
];

const kpis = [
  {
    label: 'MRR',
    value: '$65,340',
    sub: '+4.5% vs last month',
    trend: 'up',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    icon: '💰',
  },
  {
    label: 'Active Users',
    value: '3,812',
    sub: '+128 new this month',
    trend: 'up',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    icon: '👥',
  },
  {
    label: 'Churn Rate',
    value: '2.1%',
    sub: '−0.3 pp vs last month',
    trend: 'down-good',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    icon: '📉',
  },
  {
    label: 'NPS',
    value: '61',
    sub: 'Based on 214 responses',
    trend: 'neutral',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    icon: '⭐',
  },
];

const topCustomers = [
  { name: 'Acme Corp',        plan: 'Enterprise', mrr: 8200 },
  { name: 'Globex Inc',       plan: 'Enterprise', mrr: 6750 },
  { name: 'Soylent Systems',  plan: 'Growth',     mrr: 4100 },
  { name: 'Initech Solutions',plan: 'Growth',     mrr: 3480 },
  { name: 'Umbrella Labs',    plan: 'Starter',    mrr: 1950 },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function TrendBadge({ trend }) {
  if (trend === 'up')
    return <span className="text-xs font-medium text-emerald-400">▲</span>;
  if (trend === 'down-good')
    return <span className="text-xs font-medium text-emerald-400">▼</span>;
  if (trend === 'down-bad')
    return <span className="text-xs font-medium text-rose-400">▼</span>;
  return <span className="text-xs font-medium text-slate-500">—</span>;
}

function KpiCard({ label, value, sub, trend, color, bg, icon }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-slate-800 border border-slate-700 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <span className={`text-xl rounded-xl p-2 ${bg}`}>{icon}</span>
      </div>
      <div className={`text-3xl font-bold tracking-tight ${color}`}>{value}</div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <TrendBadge trend={trend} />
        {sub}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-slate-300 mb-1">{label}</p>
        <p className="text-emerald-400 font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

function PlanBadge({ plan }) {
  const styles = {
    Enterprise: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    Growth:     'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    Starter:    'bg-slate-600/40 text-slate-300 border border-slate-600',
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[plan] || styles['Starter']}`}>
      {plan}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

function SalesDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">June 2026 · All time zones UTC</p>
        </div>
        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
          ● Live
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Chart + Table row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* MRR Line Chart */}
        <div className="xl:col-span-2 rounded-2xl bg-slate-800 border border-slate-700 p-5 shadow-lg">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-200">MRR — Last 12 Months</h2>
            <p className="text-xs text-slate-500 mt-0.5">Monthly recurring revenue in USD</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mrrHistory} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mrr"
                stroke="#34d399"
                strokeWidth={2.5}
                dot={{ fill: '#34d399', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Customers Table */}
        <div className="rounded-2xl bg-slate-800 border border-slate-700 p-5 shadow-lg flex flex-col">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-200">Top Customers</h2>
            <p className="text-xs text-slate-500 mt-0.5">Ranked by monthly revenue</p>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-700">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Plan</th>
                  <th className="pb-2 font-medium text-right">MRR</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`border-b border-slate-700/50 ${i === topCustomers.length - 1 ? 'border-none' : ''}`}
                  >
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300">
                          {c.name.charAt(0)}
                        </span>
                        <span className="font-medium text-slate-200 truncate max-w-[100px]">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-2">
                      <PlanBadge plan={c.plan} />
                    </td>
                    <td className="py-3 text-right font-semibold text-emerald-400">
                      ${c.mrr.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-slate-600">
        Halison App Studio · Mock data for demonstration purposes only
      </p>
    </div>
  );
}

export default SalesDashboard;
