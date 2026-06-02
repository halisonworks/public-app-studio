/**
 * Knitting Calculator — Halison App Studio example
 *
 * Convert a pattern to your own gauge and estimate how much yarn you need.
 *
 * From the Halison App Studio public library:
 * https://github.com/halisonworks/public-app-studio
 *
 * Permitted use: personal, educational, and other non-commercial use.
 * You may modify it, but keep this header and the source link intact, and do
 * not sell, commercialize, or republish it. Released under the Halison App
 * Studio Examples License — see the LICENSE file in the repository above.
 */

import React, { useState, useMemo, useEffect } from 'react';

const STORAGE_KEY = 'halison-knitting-calculator';

const YARN_WEIGHTS = [
  { label: 'Lace',     factor: 1.5 },
  { label: 'Fingering', factor: 2.5 },
  { label: 'Sport',    factor: 3.5 },
  { label: 'DK',       factor: 4.5 },
  { label: 'Worsted',  factor: 6.0 },
  { label: 'Bulky',    factor: 8.0 },
];

const DEFAULT_STATE = {
  yourSts: '',
  yourRows: '',
  width: '',
  length: '',
  patternSts: '',
  patternCount: '',
  yarnWeightIndex: 4,
  area: '',
  skeinSize: '50',
};

function safeNum(val) {
  const n = parseFloat(val);
  return isFinite(n) && n > 0 ? n : 0;
}

function safeDivide(a, b) {
  return b !== 0 ? a / b : 0;
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    background: '#fdf2f4',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    background: '#fff',
    color: '#0f172a',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 10px 40px rgba(225,29,72,0.08)',
    border: '1px solid #fce7ec',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: 22,
    fontWeight: 700,
    color: '#e11d48',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    margin: '0 0 24px 0',
    fontSize: 13,
    color: '#94a3b8',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#e11d48',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: '1px solid #fce7ec',
  },
  row: {
    display: 'flex',
    gap: 12,
    marginBottom: 10,
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
  },
  input: {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 14,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  select: {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 14,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  resultBox: {
    background: '#fdf2f4',
    border: '1px solid #fce7ec',
    borderRadius: 10,
    padding: '12px 14px',
    marginTop: 10,
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#e11d48',
  },
  resultNote: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 1.4,
  },
  helperBtn: {
    fontSize: 11,
    color: '#e11d48',
    background: 'none',
    border: 'none',
    padding: '2px 0',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'block',
    marginTop: 2,
  },
  disclaimer: {
    marginTop: 20,
    padding: '10px 14px',
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 8,
    fontSize: 11,
    color: '#78350f',
    lineHeight: 1.5,
  },
};

export default function KnittingCalculator() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch (_) {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  function set(key, value) {
    setState(prev => ({ ...prev, [key]: value }));
  }

  // ── Section 2: stitch / row counts from your gauge ──
  const castOn = useMemo(() => {
    const sts = safeNum(state.yourSts);
    const w = safeNum(state.width);
    if (!sts || !w) return null;
    return Math.round(w / 10 * sts);
  }, [state.yourSts, state.width]);

  const totalRows = useMemo(() => {
    const rows = safeNum(state.yourRows);
    const l = safeNum(state.length);
    if (!rows || !l) return null;
    return Math.round(l / 10 * rows);
  }, [state.yourRows, state.length]);

  // ── Section 3: pattern gauge adjustment ──
  const adjustedCount = useMemo(() => {
    const yourS = safeNum(state.yourSts);
    const patS = safeNum(state.patternSts);
    const patC = safeNum(state.patternCount);
    if (!yourS || !patS || !patC) return null;
    return Math.round(patC * safeDivide(yourS, patS));
  }, [state.yourSts, state.patternSts, state.patternCount]);

  // ── Section 4: yarn estimate ──
  const yarnResult = useMemo(() => {
    const weight = YARN_WEIGHTS[state.yarnWeightIndex];
    const a = safeNum(state.area);
    const skein = safeNum(state.skeinSize) || 50;
    if (!a) return null;
    const grams = (a / 100) * weight.factor;
    const skeins = Math.ceil(grams / skein);
    return { grams: Math.round(grams), skeins };
  }, [state.area, state.yarnWeightIndex, state.skeinSize]);

  function fillAreaFromDimensions() {
    const w = safeNum(state.width);
    const l = safeNum(state.length);
    if (w && l) {
      set('area', String(Math.round(w * l * 2)));
    }
  }

  const inputFocus = { borderColor: '#e11d48' };

  function inp(key) {
    return {
      style: styles.input,
      value: state[key],
      onChange: e => set(key, e.target.value),
      type: 'number',
      min: '0',
      step: 'any',
      onFocus: e => (e.target.style.borderColor = '#e11d48'),
      onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
    };
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Knitting Calculator</h1>
        <p style={styles.subtitle}>Gauge conversion, stitch counts, and yarn estimates</p>

        {/* ── 1. YOUR GAUGE ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>1 · Your Gauge (per 10 cm swatch)</div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Stitches per 10 cm</label>
              <input {...inp('yourSts')} placeholder="e.g. 22" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Rows per 10 cm</label>
              <input {...inp('yourRows')} placeholder="e.g. 30" />
            </div>
          </div>
        </div>

        {/* ── 2. STITCH / ROW COUNTS ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>2 · Garment Size → Stitch &amp; Row Counts</div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Width (cm)</label>
              <input {...inp('width')} placeholder="e.g. 50" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Length (cm)</label>
              <input {...inp('length')} placeholder="e.g. 60" />
            </div>
          </div>
          {(castOn !== null || totalRows !== null) && (
            <div style={styles.resultBox}>
              {castOn !== null && (
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Cast-on stitches</span>
                  <span style={styles.resultValue}>{castOn}</span>
                </div>
              )}
              {totalRows !== null && (
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Total rows</span>
                  <span style={styles.resultValue}>{totalRows}</span>
                </div>
              )}
              <div style={styles.resultNote}>Estimate only — add ease and finishing as needed.</div>
            </div>
          )}
        </div>

        {/* ── 3. PATTERN GAUGE ADJUSTMENT ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>3 · Pattern Gauge Adjustment</div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Pattern gauge (sts/10 cm)</label>
              <input {...inp('patternSts')} placeholder="e.g. 20" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Pattern stitch count</label>
              <input {...inp('patternCount')} placeholder="e.g. 100" />
            </div>
          </div>
          {adjustedCount !== null && (
            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Adjusted stitch count</span>
                <span style={styles.resultValue}>{adjustedCount}</span>
              </div>
              <div style={styles.resultNote}>
                Use this count instead of the pattern's to keep the same finished size on your gauge.
              </div>
            </div>
          )}
        </div>

        {/* ── 4. YARN ESTIMATE ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>4 · Yarn Estimate</div>
          <div style={{ marginBottom: 10 }}>
            <label style={styles.label}>Yarn weight</label>
            <select
              style={{ ...styles.select, marginTop: 4 }}
              value={state.yarnWeightIndex}
              onChange={e => set('yarnWeightIndex', Number(e.target.value))}
            >
              {YARN_WEIGHTS.map((w, i) => (
                <option key={w.label} value={i}>
                  {w.label} (~{w.factor} g per 100 cm²)
                </option>
              ))}
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Garment area (cm²)</label>
            <input {...inp('area')} placeholder="e.g. 6000" />
            <button style={styles.helperBtn} onClick={fillAreaFromDimensions} type="button">
              Fill from width × length × 2 (front + back)
            </button>
          </div>
          <div style={{ ...styles.field, marginTop: 10 }}>
            <label style={styles.label}>Skein size (g)</label>
            <input {...inp('skeinSize')} placeholder="50" />
          </div>
          {yarnResult && (
            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Estimated yarn</span>
                <span style={styles.resultValue}>{yarnResult.grams} g</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Skeins needed</span>
                <span style={styles.resultValue}>{yarnResult.skeins}</span>
              </div>
              <div style={styles.resultNote}>
                Rough estimate — actual yarn use varies with stitch pattern, ease, and tension.
                Buy one extra skein to be safe.
              </div>
            </div>
          )}
        </div>

        <div style={styles.disclaimer}>
          All results are estimates. Gauge swatches, stitch patterns, and finishing all affect
          actual numbers. Always swatch and verify before committing to a project.
        </div>
      </div>
    </div>
  );
}
