/**
 * Recipe Scaler — Halison App Studio example
 *
 * Scale a recipe up or down and convert between common kitchen units.
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

const STORAGE_KEY = 'halison-recipe-scaler';

const DENSITY_PRESETS = [
  { label: 'Flour', density: 0.53 },
  { label: 'Sugar', density: 0.85 },
  { label: 'Butter', density: 0.96 },
  { label: 'Water / Liquid', density: 1.0 },
  { label: 'Honey', density: 1.42 },
  { label: 'Other (set density)', density: null },
];

// Volume in ml for each unit
const UNIT_ML = {
  ml: 1,
  l: 1000,
  cup: 240,
  tbsp: 15,
  tsp: 5,
};

const SEED_INGREDIENTS = [
  { id: 1, name: 'All-purpose flour', amount: '300', unit: 'g' },
  { id: 2, name: 'Sugar', amount: '150', unit: 'g' },
  { id: 3, name: 'Butter', amount: '100', unit: 'g' },
];

function nextId(list) {
  return list.length === 0 ? 1 : Math.max(...list.map((r) => r.id)) + 1;
}

function roundNice(n) {
  if (!isFinite(n) || n === 0) return '0';
  const mag = Math.floor(Math.log10(Math.abs(n)));
  const factor = Math.pow(10, 1 - mag);
  return String(Math.round(n * factor) / factor);
}

function convertUnits(value, fromUnit, toUnit, density) {
  const volumeUnits = new Set(Object.keys(UNIT_ML));
  const weightUnits = new Set(['g', 'kg']);

  const fromIsVol = volumeUnits.has(fromUnit);
  const fromIsWt = weightUnits.has(fromUnit);
  const toIsVol = volumeUnits.has(toUnit);
  const toIsWt = weightUnits.has(toUnit);

  // Convert input to a base unit (ml or g)
  let baseMl = null;
  let baseG = null;

  if (fromIsVol) {
    baseMl = value * UNIT_ML[fromUnit];
  } else if (fromUnit === 'g') {
    baseG = value;
  } else if (fromUnit === 'kg') {
    baseG = value * 1000;
  }

  // Cross volume <-> weight using density
  if (baseMl !== null && toIsWt) {
    if (!density) return null;
    baseG = baseMl * density;
    baseMl = null;
  } else if (baseG !== null && toIsVol) {
    if (!density) return null;
    baseMl = baseG / density;
    baseG = null;
  }

  // Convert base to target
  if (toIsVol && baseMl !== null) {
    return baseMl / UNIT_ML[toUnit];
  } else if (toUnit === 'g' && baseG !== null) {
    return baseG;
  } else if (toUnit === 'kg' && baseG !== null) {
    return baseG / 1000;
  }

  return null;
}

export default function RecipeScaler() {
  const [ingredients, setIngredients] = useState(SEED_INGREDIENTS);
  const [origServings, setOrigServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('4');
  const [loaded, setLoaded] = useState(false);

  // Converter state
  const [convValue, setConvValue] = useState('');
  const [convFrom, setConvFrom] = useState('g');
  const [convTo, setConvTo] = useState('ml');
  const [convPresetIdx, setConvPresetIdx] = useState(3); // Water default
  const [customDensity, setCustomDensity] = useState('1.0');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.ingredients) setIngredients(data.ingredients);
        if (data.origServings) setOrigServings(data.origServings);
        if (data.desiredServings) setDesiredServings(data.desiredServings);
      }
    } catch (_) {}
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ingredients, origServings, desiredServings })
      );
    } catch (_) {}
  }, [ingredients, origServings, desiredServings, loaded]);

  const scaleFactor = useMemo(() => {
    const orig = Math.max(1, parseFloat(origServings) || 1);
    const desired = Math.max(1, parseFloat(desiredServings) || 1);
    return desired / orig;
  }, [origServings, desiredServings]);

  function updateIngredient(id, field, value) {
    setIngredients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: nextId(prev), name: '', amount: '1', unit: 'g' },
    ]);
  }

  function removeIngredient(id) {
    setIngredients((prev) => prev.filter((r) => r.id !== id));
  }

  // Converter
  const density = useMemo(() => {
    const preset = DENSITY_PRESETS[convPresetIdx];
    if (preset.density !== null) return preset.density;
    return Math.max(0.001, parseFloat(customDensity) || 1.0);
  }, [convPresetIdx, customDensity]);

  const convResult = useMemo(() => {
    const v = parseFloat(convValue);
    if (!isFinite(v) || v === 0 || convFrom === convTo) return null;
    return convertUnits(v, convFrom, convTo, density);
  }, [convValue, convFrom, convTo, density]);

  const needsDensity =
    (Object.keys(UNIT_ML).includes(convFrom) && ['g', 'kg'].includes(convTo)) ||
    (['g', 'kg'].includes(convFrom) && Object.keys(UNIT_ML).includes(convTo));

  const s = styles;

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.title}>Recipe Scaler</h1>

        {/* Servings */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Servings</h2>
          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>Original servings</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="1"
                value={origServings}
                onChange={(e) => setOrigServings(e.target.value)}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Desired servings</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="1"
                value={desiredServings}
                onChange={(e) => setDesiredServings(e.target.value)}
              />
            </div>
          </div>
          <div style={s.factorBadge}>
            Scale factor: <strong style={s.accent}>×{scaleFactor.toFixed(2)}</strong>
          </div>
        </section>

        {/* Ingredient list */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Ingredients</h2>
          <div style={s.tableHead}>
            <span style={{ flex: 3 }}>Name</span>
            <span style={{ flex: 1.4, textAlign: 'right' }}>Original</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Unit</span>
            <span style={{ flex: 1.4, textAlign: 'right', color: '#d97706' }}>Scaled</span>
            <span style={{ width: 28 }} />
          </div>
          {ingredients.map((ing) => {
            const origAmt = parseFloat(ing.amount) || 0;
            const scaledAmt = origAmt * scaleFactor;
            return (
              <div key={ing.id} style={s.tableRow}>
                <input
                  style={{ ...s.cellInput, flex: 3 }}
                  type="text"
                  placeholder="Ingredient name"
                  value={ing.name}
                  onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                />
                <input
                  style={{ ...s.cellInput, flex: 1.4, textAlign: 'right' }}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder="0"
                  value={ing.amount}
                  onChange={(e) => updateIngredient(ing.id, 'amount', e.target.value)}
                />
                <input
                  style={{ ...s.cellInput, flex: 1, textAlign: 'center' }}
                  type="text"
                  placeholder="g"
                  value={ing.unit}
                  onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                />
                <span style={{ flex: 1.4, textAlign: 'right', color: '#d97706', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {origAmt === 0 ? '—' : `${roundNice(scaledAmt)} ${ing.unit}`}
                </span>
                <button
                  style={s.removeBtn}
                  onClick={() => removeIngredient(ing.id)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            );
          })}
          <button style={s.addBtn} onClick={addIngredient}>
            + Add ingredient
          </button>
        </section>

        {/* Unit converter */}
        <section style={s.section}>
          <h2 style={s.sectionTitle}>Unit Converter</h2>

          <div style={s.field}>
            <label style={s.label}>Ingredient preset (for volume ↔ weight)</label>
            <select
              style={s.select}
              value={convPresetIdx}
              onChange={(e) => setConvPresetIdx(Number(e.target.value))}
            >
              {DENSITY_PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  {p.label}
                  {p.density !== null ? ` (${p.density} g/ml)` : ''}
                </option>
              ))}
            </select>
          </div>

          {DENSITY_PRESETS[convPresetIdx].density === null && (
            <div style={s.field}>
              <label style={s.label}>Custom density (g/ml)</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="0.001"
                step="0.01"
                value={customDensity}
                onChange={(e) => setCustomDensity(e.target.value)}
              />
            </div>
          )}

          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>Value</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={convValue}
                onChange={(e) => setConvValue(e.target.value)}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>From</label>
              <select
                style={s.select}
                value={convFrom}
                onChange={(e) => setConvFrom(e.target.value)}
              >
                {['ml', 'l', 'cup', 'tbsp', 'tsp', 'g', 'kg'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>To</label>
              <select
                style={s.select}
                value={convTo}
                onChange={(e) => setConvTo(e.target.value)}
              >
                {['ml', 'l', 'cup', 'tbsp', 'tsp', 'g', 'kg'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {needsDensity && (
            <p style={s.hint}>
              Volume ↔ weight conversion uses the selected density above.
            </p>
          )}

          <div style={s.resultBox}>
            {convValue === '' ? (
              <span style={{ color: '#94a3b8' }}>Enter a value above</span>
            ) : convFrom === convTo ? (
              <span style={{ color: '#94a3b8' }}>Same unit — no conversion needed</span>
            ) : convResult === null ? (
              <span style={{ color: '#ef4444' }}>
                Cannot convert — density needed for volume ↔ weight
              </span>
            ) : (
              <>
                <span style={{ color: '#475569' }}>
                  {convValue} {convFrom} =
                </span>{' '}
                <strong style={s.accent}>
                  {roundNice(convResult)} {convTo}
                </strong>
              </>
            )}
          </div>
        </section>

        {/* Oven note */}
        <div style={s.ovenNote}>
          <strong>Oven note:</strong> Scaling quantity does NOT scale oven temperature
          or time linearly. Keep the temperature the same — larger batches may need
          a little longer. Watch for doneness, not just the clock.
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '32px 16px',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: '#ffffff',
    borderRadius: 16,
    padding: '28px 28px 32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  },
  title: {
    margin: '0 0 24px',
    fontSize: 26,
    fontWeight: 800,
    color: '#1e293b',
    borderBottom: '3px solid #d97706',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    margin: '0 0 12px',
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#d97706',
  },
  row2: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    minWidth: 120,
    marginBottom: 12,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  input: {
    width: '100%',
    padding: '9px 11px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#1e293b',
    boxSizing: 'border-box',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '9px 11px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#1e293b',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  factorBadge: {
    display: 'inline-block',
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 14,
    color: '#78350f',
    marginTop: 4,
  },
  accent: {
    color: '#d97706',
  },
  tableHead: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    padding: '0 0 6px',
    borderBottom: '2px solid #f1f5f9',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#94a3b8',
  },
  tableRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  cellInput: {
    padding: '7px 8px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#1e293b',
    boxSizing: 'border-box',
    minWidth: 0,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: '1px solid #fecaca',
    background: '#fff5f5',
    color: '#ef4444',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
  },
  addBtn: {
    marginTop: 10,
    padding: '8px 16px',
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #d97706',
    background: '#fff7ed',
    color: '#d97706',
    fontWeight: 600,
    cursor: 'pointer',
  },
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    margin: '0 0 10px',
    fontStyle: 'italic',
  },
  resultBox: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 16,
    minHeight: 44,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  ovenNote: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    color: '#78350f',
    lineHeight: 1.5,
  },
};
