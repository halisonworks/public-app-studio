/**
 * Material Calculator — Halison App Studio example
 *
 * Estimate paint, flooring, and lumber for a job, with cost.
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

const STORAGE_KEY = 'halison-material-calculator';

const DEFAULT_CUTS = [
  { label: 'Shelf', length: '80', qty: '3' },
  { label: 'Support', length: '40', qty: '4' },
];

const DEFAULT_STATE = {
  mode: 'paint',
  currency: '$',

  // Paint
  paintAreaMode: 'direct',
  paintArea: '',
  paintPerimeter: '',
  paintHeight: '',
  paintOpenings: '0',
  paintCoverage: '10',
  paintCoats: '2',
  paintPricePerLitre: '',

  // Flooring
  floorAreaMode: 'direct',
  floorArea: '',
  floorLength: '',
  floorWidth: '',
  floorWaste: '10',
  floorPackCoverage: '2.0',
  floorPricePerPack: '',

  // Lumber
  lumberStockLength: '240',
  lumberPricePerBoard: '',
  cuts: DEFAULT_CUTS,
};

function safeNum(val) {
  const n = parseFloat(val);
  return isFinite(n) ? n : 0;
}

function fmt(n) {
  return n.toFixed(2);
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    background: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: '#fff',
    color: '#0f172a',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 10px 40px rgba(37,99,235,0.08)',
    border: '1px solid #dbeafe',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: 22,
    fontWeight: 700,
    color: '#2563eb',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    margin: '0 0 20px 0',
    fontSize: 13,
    color: '#94a3b8',
  },
  tabBar: {
    display: 'flex',
    gap: 6,
    marginBottom: 24,
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: 0,
  },
  tab: (active) => ({
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    color: active ? '#2563eb' : '#64748b',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2.5px solid #2563eb' : '2.5px solid transparent',
    marginBottom: -2,
    cursor: 'pointer',
    borderRadius: '4px 4px 0 0',
    transition: 'color 0.15s',
  }),
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1px solid #dbeafe',
  },
  row: {
    display: 'flex',
    gap: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    minWidth: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  fieldFull: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 10,
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
  toggleRow: {
    display: 'flex',
    gap: 6,
    marginBottom: 12,
  },
  toggleBtn: (active) => ({
    flex: 1,
    padding: '6px 10px',
    fontSize: 12,
    fontWeight: 600,
    background: active ? '#eff6ff' : '#f8fafc',
    color: active ? '#2563eb' : '#64748b',
    border: active ? '1.5px solid #bfdbfe' : '1.5px solid #e2e8f0',
    borderRadius: 7,
    cursor: 'pointer',
  }),
  resultBox: {
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: 10,
    padding: '12px 14px',
    marginTop: 12,
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  resultLabel: {
    fontSize: 13,
    color: '#475569',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2563eb',
  },
  resultNote: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 1.5,
  },
  helperBtn: {
    fontSize: 11,
    color: '#2563eb',
    background: 'none',
    border: 'none',
    padding: '2px 0',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline-block',
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
  // Lumber cut list
  cutTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 8,
    fontSize: 13,
  },
  cutTh: {
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 700,
    color: '#64748b',
    paddingBottom: 4,
  },
  cutTd: {
    padding: '3px 4px 3px 0',
    verticalAlign: 'middle',
  },
  cutInput: {
    padding: '5px 8px',
    borderRadius: 6,
    border: '1.5px solid #e2e8f0',
    fontSize: 13,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    padding: '0 4px',
  },
  addBtn: {
    fontSize: 12,
    color: '#2563eb',
    background: 'none',
    border: '1.5px solid #bfdbfe',
    borderRadius: 7,
    padding: '5px 12px',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

function inputProps(value, onChange, placeholder, type = 'number') {
  return {
    style: styles.input,
    value,
    onChange,
    placeholder,
    type,
    min: type === 'number' ? '0' : undefined,
    step: type === 'number' ? 'any' : undefined,
    onFocus: e => (e.target.style.borderColor = '#2563eb'),
    onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
  };
}

function cutInputProps(value, onChange, placeholder, type = 'text') {
  return {
    style: styles.cutInput,
    value,
    onChange,
    placeholder,
    type,
    min: type === 'number' ? '0' : undefined,
    step: type === 'number' ? 'any' : undefined,
    onFocus: e => (e.target.style.borderColor = '#2563eb'),
    onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
  };
}

// ── Currency display helper ──
function money(currency, amount) {
  const sym = (currency || '$').trim();
  return `${sym}${fmt(amount)}`;
}

export default function MaterialCalculator() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed, cuts: parsed.cuts || DEFAULT_CUTS };
      }
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

  function setCut(idx, field, value) {
    setState(prev => {
      const cuts = prev.cuts.map((c, i) => i === idx ? { ...c, [field]: value } : c);
      return { ...prev, cuts };
    });
  }

  function addCut() {
    setState(prev => ({ ...prev, cuts: [...prev.cuts, { label: '', length: '', qty: '1' }] }));
  }

  function removeCut(idx) {
    setState(prev => ({ ...prev, cuts: prev.cuts.filter((_, i) => i !== idx) }));
  }

  // ── PAINT CALC ──
  const paintResult = useMemo(() => {
    let area = 0;
    if (state.paintAreaMode === 'direct') {
      area = safeNum(state.paintArea);
    } else {
      area = safeNum(state.paintPerimeter) * safeNum(state.paintHeight);
    }
    area = Math.max(0, area - safeNum(state.paintOpenings));
    const coverage = safeNum(state.paintCoverage) || 10;
    const coats = safeNum(state.paintCoats) || 1;
    const rawLitres = (area * coats) / coverage;
    const litres = Math.ceil(rawLitres);
    const price = safeNum(state.paintPricePerLitre);
    const cost = litres * price;
    return { area: area.toFixed(2), rawLitres: rawLitres.toFixed(2), litres, cost };
  }, [
    state.paintAreaMode, state.paintArea, state.paintPerimeter, state.paintHeight,
    state.paintOpenings, state.paintCoverage, state.paintCoats, state.paintPricePerLitre,
  ]);

  // ── FLOORING CALC ──
  const floorResult = useMemo(() => {
    let area = 0;
    if (state.floorAreaMode === 'direct') {
      area = safeNum(state.floorArea);
    } else {
      area = safeNum(state.floorLength) * safeNum(state.floorWidth);
    }
    const waste = safeNum(state.floorWaste);
    const areaWithWaste = area * (1 + waste / 100);
    const packCoverage = safeNum(state.floorPackCoverage) || 1;
    const packs = Math.ceil(areaWithWaste / packCoverage);
    const price = safeNum(state.floorPricePerPack);
    const cost = packs * price;
    return { area: area.toFixed(2), areaWithWaste: areaWithWaste.toFixed(2), packs, cost };
  }, [
    state.floorAreaMode, state.floorArea, state.floorLength, state.floorWidth,
    state.floorWaste, state.floorPackCoverage, state.floorPricePerPack,
  ]);

  // ── LUMBER CALC ──
  const lumberResult = useMemo(() => {
    const stockLength = safeNum(state.lumberStockLength) || 240;
    const totalLength = state.cuts.reduce((sum, c) => {
      return sum + safeNum(c.length) * safeNum(c.qty);
    }, 0);
    const boards = Math.ceil(totalLength / stockLength);
    const price = safeNum(state.lumberPricePerBoard);
    const cost = boards * price;
    return {
      totalLengthCm: totalLength.toFixed(0),
      totalLengthM: (totalLength / 100).toFixed(2),
      boards,
      cost,
    };
  }, [state.cuts, state.lumberStockLength, state.lumberPricePerBoard]);

  const hasPaintPrice = safeNum(state.paintPricePerLitre) > 0;
  const hasFloorPrice = safeNum(state.floorPricePerPack) > 0;
  const hasLumberPrice = safeNum(state.lumberPricePerBoard) > 0;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Material Calculator</h1>
        <p style={styles.subtitle}>Estimate paint, flooring / tiles, and lumber with cost</p>

        {/* Currency setting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Currency symbol:</span>
          <input
            {...inputProps(state.currency, e => set('currency', e.target.value), '$', 'text')}
            style={{ ...styles.input, width: 60, textAlign: 'center' }}
          />
        </div>

        {/* Tab bar */}
        <div style={styles.tabBar}>
          {[['paint', 'Paint'], ['floor', 'Flooring / Tiles'], ['lumber', 'Lumber']].map(([key, label]) => (
            <button key={key} style={styles.tab(state.mode === key)} onClick={() => set('mode', key)} type="button">
              {label}
            </button>
          ))}
        </div>

        {/* ── PAINT MODE ── */}
        {state.mode === 'paint' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Wall Area</div>
              <div style={styles.toggleRow}>
                <button style={styles.toggleBtn(state.paintAreaMode === 'direct')} type="button"
                  onClick={() => set('paintAreaMode', 'direct')}>Enter area (m²)</button>
                <button style={styles.toggleBtn(state.paintAreaMode === 'helper')} type="button"
                  onClick={() => set('paintAreaMode', 'helper')}>Perimeter + height</button>
              </div>

              {state.paintAreaMode === 'direct' ? (
                <div style={styles.fieldFull}>
                  <label style={styles.label}>Paintable wall area (m²)</label>
                  <input {...inputProps(state.paintArea, e => set('paintArea', e.target.value), 'e.g. 40')} />
                </div>
              ) : (
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Room perimeter (m)</label>
                    <input {...inputProps(state.paintPerimeter, e => set('paintPerimeter', e.target.value), 'e.g. 16')} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Wall height (m)</label>
                    <input {...inputProps(state.paintHeight, e => set('paintHeight', e.target.value), 'e.g. 2.4')} />
                  </div>
                </div>
              )}

              <div style={styles.fieldFull}>
                <label style={styles.label}>Openings to subtract — doors &amp; windows (m²)</label>
                <input {...inputProps(state.paintOpenings, e => set('paintOpenings', e.target.value), '0')} />
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Coverage &amp; Coats</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Coverage (m² / litre / coat)</label>
                  <input {...inputProps(state.paintCoverage, e => set('paintCoverage', e.target.value), '10')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Number of coats</label>
                  <input {...inputProps(state.paintCoats, e => set('paintCoats', e.target.value), '2')} />
                </div>
              </div>
              <div style={styles.fieldFull}>
                <label style={styles.label}>Price per litre ({state.currency || '$'})</label>
                <input {...inputProps(state.paintPricePerLitre, e => set('paintPricePerLitre', e.target.value), 'optional')} />
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Paintable area</span>
                <span style={styles.resultValue}>{paintResult.area} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Litres needed (rounded up)</span>
                <span style={styles.resultValue}>{paintResult.litres} L</span>
              </div>
              <div style={{ ...styles.resultRow, marginBottom: 0 }}>
                <span style={{ ...styles.resultLabel, fontSize: 11 }}>Exact: {paintResult.rawLitres} L</span>
              </div>
              {hasPaintPrice && (
                <div style={{ ...styles.resultRow, marginTop: 8 }}>
                  <span style={styles.resultLabel}>Estimated cost</span>
                  <span style={styles.resultValue}>{money(state.currency, paintResult.cost)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                These are estimates — coverage varies by paint type, surface, and application method.
                Buy a bit extra for touch-ups.
              </div>
            </div>
          </>
        )}

        {/* ── FLOORING MODE ── */}
        {state.mode === 'floor' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Room Area</div>
              <div style={styles.toggleRow}>
                <button style={styles.toggleBtn(state.floorAreaMode === 'direct')} type="button"
                  onClick={() => set('floorAreaMode', 'direct')}>Enter area (m²)</button>
                <button style={styles.toggleBtn(state.floorAreaMode === 'helper')} type="button"
                  onClick={() => set('floorAreaMode', 'helper')}>Length × width</button>
              </div>

              {state.floorAreaMode === 'direct' ? (
                <div style={styles.fieldFull}>
                  <label style={styles.label}>Room area (m²)</label>
                  <input {...inputProps(state.floorArea, e => set('floorArea', e.target.value), 'e.g. 18')} />
                </div>
              ) : (
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Length (m)</label>
                    <input {...inputProps(state.floorLength, e => set('floorLength', e.target.value), 'e.g. 5')} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Width (m)</label>
                    <input {...inputProps(state.floorWidth, e => set('floorWidth', e.target.value), 'e.g. 3.6')} />
                  </div>
                </div>
              )}
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Waste &amp; Packs</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Waste % (for cuts &amp; offcuts)</label>
                  <input {...inputProps(state.floorWaste, e => set('floorWaste', e.target.value), '10')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Pack / box coverage (m²)</label>
                  <input {...inputProps(state.floorPackCoverage, e => set('floorPackCoverage', e.target.value), '2.0')} />
                </div>
              </div>
              <div style={styles.fieldFull}>
                <label style={styles.label}>Price per pack ({state.currency || '$'})</label>
                <input {...inputProps(state.floorPricePerPack, e => set('floorPricePerPack', e.target.value), 'optional')} />
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Base area</span>
                <span style={styles.resultValue}>{floorResult.area} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Area incl. waste</span>
                <span style={styles.resultValue}>{floorResult.areaWithWaste} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Packs needed (rounded up)</span>
                <span style={styles.resultValue}>{floorResult.packs}</span>
              </div>
              {hasFloorPrice && (
                <div style={{ ...styles.resultRow, marginTop: 4 }}>
                  <span style={styles.resultLabel}>Estimated cost</span>
                  <span style={styles.resultValue}>{money(state.currency, floorResult.cost)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                These are estimates — actual waste depends on room shape, tile pattern, and cut complexity.
                For diagonal or herringbone patterns, add extra waste.
              </div>
            </div>
          </>
        )}

        {/* ── LUMBER MODE ── */}
        {state.mode === 'lumber' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Cut List</div>
              <table style={styles.cutTable}>
                <thead>
                  <tr>
                    <th style={styles.cutTh}>Label</th>
                    <th style={{ ...styles.cutTh, width: 90 }}>Length (cm)</th>
                    <th style={{ ...styles.cutTh, width: 60 }}>Qty</th>
                    <th style={{ width: 30 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {state.cuts.map((cut, idx) => (
                    <tr key={idx}>
                      <td style={styles.cutTd}>
                        <input
                          {...cutInputProps(cut.label, e => setCut(idx, 'label', e.target.value), 'e.g. Shelf')}
                        />
                      </td>
                      <td style={styles.cutTd}>
                        <input
                          {...cutInputProps(cut.length, e => setCut(idx, 'length', e.target.value), '80', 'number')}
                        />
                      </td>
                      <td style={styles.cutTd}>
                        <input
                          {...cutInputProps(cut.qty, e => setCut(idx, 'qty', e.target.value), '1', 'number')}
                        />
                      </td>
                      <td style={styles.cutTd}>
                        <button style={styles.removeBtn} type="button" onClick={() => removeCut(idx)}
                          title="Remove row">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.addBtn} type="button" onClick={addCut}>+ Add piece</button>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Stock Board &amp; Price</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Stock board length (cm)</label>
                  <input {...inputProps(state.lumberStockLength, e => set('lumberStockLength', e.target.value), '240')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Price per board ({state.currency || '$'})</label>
                  <input {...inputProps(state.lumberPricePerBoard, e => set('lumberPricePerBoard', e.target.value), 'optional')} />
                </div>
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Total length needed</span>
                <span style={styles.resultValue}>{lumberResult.totalLengthM} m ({lumberResult.totalLengthCm} cm)</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Boards needed (rounded up)</span>
                <span style={styles.resultValue}>{lumberResult.boards}</span>
              </div>
              {hasLumberPrice && (
                <div style={{ ...styles.resultRow, marginTop: 4 }}>
                  <span style={styles.resultLabel}>Estimated cost</span>
                  <span style={styles.resultValue}>{money(state.currency, lumberResult.cost)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                Boards = total length ÷ stock length, rounded up. Real cut lists depend on how pieces nest
                on each board — buy a couple of boards extra to cover offcuts and mistakes.
              </div>
            </div>
          </>
        )}

        <div style={styles.disclaimer}>
          All results are estimates. Buy a bit extra for waste, offcuts, and variation in coverage.
          Always verify measurements on site before ordering.
        </div>
      </div>
    </div>
  );
}
