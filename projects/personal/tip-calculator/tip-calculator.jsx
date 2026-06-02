/**
 * Tip Calculator — Halison App Studio example
 *
 * Split a bill and add a tip. A small, self-contained React component:
 * no external libraries, no build step. Load it into App Studio with
 * New → paste → Run App, or open the file from disk.
 *
 * From the Halison App Studio public library:
 * https://github.com/halisonworks/public-app-studio
 *
 * Halison App Studio Examples License — non-commercial use, keep this header.
 */

import React, { useState, useMemo } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const { tip, total, perPerson } = useMemo(() => {
    const amount = parseFloat(bill) || 0;
    const heads = Math.max(1, people);
    const tipValue = amount * (tipPercent / 100);
    const totalValue = amount + tipValue;
    return {
      tip: tipValue,
      total: totalValue,
      perPerson: totalValue / heads,
    };
  }, [bill, tipPercent, people]);

  const money = (n) =>
    n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      padding: 24,
      boxSizing: 'border-box',
    },
    card: {
      width: '100%',
      maxWidth: 380,
      background: '#1e293b',
      color: '#e2e8f0',
      borderRadius: 16,
      padding: 28,
      boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
    },
    title: { margin: '0 0 20px', fontSize: 22, fontWeight: 700 },
    label: { display: 'block', fontSize: 13, marginBottom: 6, color: '#94a3b8' },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: 16,
      borderRadius: 8,
      border: '1px solid #334155',
      background: '#0f172a',
      color: '#e2e8f0',
      boxSizing: 'border-box',
    },
    field: { marginBottom: 18 },
    chips: { display: 'flex', gap: 8, flexWrap: 'wrap' },
    chip: (active) => ({
      flex: 1,
      minWidth: 56,
      padding: '8px 0',
      borderRadius: 8,
      border: '1px solid ' + (active ? '#38bdf8' : '#334155'),
      background: active ? '#0ea5e9' : '#0f172a',
      color: active ? '#0f172a' : '#e2e8f0',
      fontWeight: 600,
      cursor: 'pointer',
    }),
    result: {
      marginTop: 22,
      paddingTop: 18,
      borderTop: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    row: { display: 'flex', justifyContent: 'space-between', fontSize: 15 },
    grand: { fontSize: 22, fontWeight: 700, color: '#38bdf8' },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tip Calculator</h1>

        <div style={styles.field}>
          <label style={styles.label}>Bill amount</label>
          <input
            style={styles.input}
            type="number"
            inputMode="decimal"
            min="0"
            placeholder="0.00"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tip — {tipPercent}%</label>
          <div style={styles.chips}>
            {[10, 15, 18, 20, 25].map((p) => (
              <button
                key={p}
                style={styles.chip(p === tipPercent)}
                onClick={() => setTipPercent(p)}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Split between</label>
          <input
            style={styles.input}
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value, 10) || 1)}
          />
        </div>

        <div style={styles.result}>
          <div style={styles.row}>
            <span>Tip</span>
            <span>{money(tip)}</span>
          </div>
          <div style={styles.row}>
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <div style={{ ...styles.row, ...styles.grand }}>
            <span>Each pays</span>
            <span>{money(perPerson)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
