/**
 * Planting Calendar — Halison App Studio example
 *
 * Plan when to sow, plant out, and harvest your vegetables, with bed spacing.
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

const CROPS = [
  {
    id: 'tomato',
    name: 'Tomato',
    sowIndoor: [3, 4],
    sowOutdoor: [],
    plantOut: [6, 6],
    harvest: [8, 10],
    rowSpacing: 60,
    plantSpacing: 45,
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    sowIndoor: [],
    sowOutdoor: [4, 7],
    plantOut: [],
    harvest: [6, 9],
    rowSpacing: 30,
    plantSpacing: 25,
  },
  {
    id: 'carrot',
    name: 'Carrot',
    sowIndoor: [],
    sowOutdoor: [4, 6],
    plantOut: [],
    harvest: [7, 10],
    rowSpacing: 25,
    plantSpacing: 5,
  },
  {
    id: 'potato',
    name: 'Potato',
    sowIndoor: [],
    sowOutdoor: [],
    plantOut: [5, 5],
    harvest: [8, 9],
    rowSpacing: 60,
    plantSpacing: 30,
  },
  {
    id: 'peas',
    name: 'Peas',
    sowIndoor: [],
    sowOutdoor: [4, 6],
    plantOut: [],
    harvest: [7, 8],
    rowSpacing: 45,
    plantSpacing: 5,
  },
  {
    id: 'radish',
    name: 'Radish',
    sowIndoor: [],
    sowOutdoor: [4, 8],
    plantOut: [],
    harvest: [5, 9],
    rowSpacing: 15,
    plantSpacing: 3,
  },
  {
    id: 'beetroot',
    name: 'Beetroot',
    sowIndoor: [],
    sowOutdoor: [4, 6],
    plantOut: [],
    harvest: [7, 10],
    rowSpacing: 30,
    plantSpacing: 8,
  },
  {
    id: 'onion',
    name: 'Onion',
    sowIndoor: [],
    sowOutdoor: [],
    plantOut: [4, 5],
    harvest: [8, 9],
    rowSpacing: 25,
    plantSpacing: 10,
  },
  {
    id: 'kale',
    name: 'Kale',
    sowIndoor: [3, 4],
    sowOutdoor: [],
    plantOut: [5, 6],
    harvest: [8, 11],
    rowSpacing: 50,
    plantSpacing: 40,
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    sowIndoor: [4, 5],
    sowOutdoor: [],
    plantOut: [6, 6],
    harvest: [7, 9],
    rowSpacing: 60,
    plantSpacing: 40,
  },
  {
    id: 'spinach',
    name: 'Spinach',
    sowIndoor: [],
    sowOutdoor: [4, 8],
    plantOut: [],
    harvest: [5, 10],
    rowSpacing: 25,
    plantSpacing: 8,
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    sowIndoor: [],
    sowOutdoor: [],
    plantOut: [4, 5],
    harvest: [6, 7],
    rowSpacing: 40,
    plantSpacing: 30,
  },
];

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const REGION_OPTIONS = [
  { value: -1, label: 'Mild / coastal (earlier)' },
  { value: 0, label: 'Average' },
  { value: 1, label: 'Cold / inland (later)' },
];

const STORAGE_KEY = 'halison-planting-calendar';

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function shiftRange(range, offset) {
  if (!range || range.length === 0) return [];
  return [clamp(range[0] + offset, 1, 12), clamp(range[1] + offset, 1, 12)];
}

function inRange(month, range) {
  if (!range || range.length < 2) return false;
  const [start, end] = range;
  if (start <= end) return month >= start && month <= end;
  return month >= start || month <= end;
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    padding: '24px 16px',
    boxSizing: 'border-box',
    color: '#1e293b',
  },
  container: {
    maxWidth: 760,
    margin: '0 auto',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: '#16a34a',
    margin: '0 0 4px',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    margin: 0,
  },
  card: {
    background: '#ffffff',
    borderRadius: 12,
    padding: '20px 24px',
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 14px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: 12,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 13,
    color: '#475569',
    fontWeight: 500,
  },
  select: {
    padding: '7px 10px',
    borderRadius: 7,
    border: '1px solid #cbd5e1',
    background: '#fff',
    fontSize: 13,
    color: '#1e293b',
    cursor: 'pointer',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: (active) => ({
    padding: '5px 13px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    border: '1.5px solid',
    borderColor: active ? '#16a34a' : '#cbd5e1',
    background: active ? '#dcfce7' : '#f8fafc',
    color: active ? '#15803d' : '#64748b',
    userSelect: 'none',
    transition: 'background 0.15s, color 0.15s',
  }),
  timelineWrap: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  timelineGrid: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(12, minmax(36px, 1fr))',
    gap: '2px 2px',
    minWidth: 580,
  },
  timelineHeaderCell: {
    fontSize: 11,
    fontWeight: 700,
    color: '#94a3b8',
    textAlign: 'center',
    padding: '4px 0',
    userSelect: 'none',
  },
  timelineCropLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#334155',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  timelineCell: (type) => {
    const colors = {
      sowIndoor: { bg: '#fef9c3', border: '#eab308' },
      sowOutdoor: { bg: '#bfdbfe', border: '#3b82f6' },
      plantOut: { bg: '#bfdbfe', border: '#3b82f6' },
      harvest: { bg: '#bbf7d0', border: '#16a34a' },
      empty: { bg: 'transparent', border: 'transparent' },
    };
    const c = colors[type] || colors.empty;
    return {
      background: c.bg,
      borderRadius: 4,
      border: `1.5px solid ${c.border}`,
      height: 26,
    };
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 20px',
    marginBottom: 14,
    fontSize: 12,
    color: '#475569',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  legendSwatch: (color, border) => ({
    width: 14,
    height: 14,
    borderRadius: 3,
    background: color,
    border: `1.5px solid ${border}`,
    flexShrink: 0,
  }),
  spacerSection: {},
  spacingRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 110,
  },
  input: {
    padding: '8px 10px',
    borderRadius: 7,
    border: '1px solid #cbd5e1',
    background: '#fff',
    fontSize: 14,
    color: '#1e293b',
    width: '100%',
    boxSizing: 'border-box',
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 10,
    marginTop: 4,
  },
  resultBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 8,
    padding: '10px 14px',
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: 700,
    color: '#16a34a',
    lineHeight: 1.2,
  },
  resultLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  disclaimer: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 16,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  noSelection: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    padding: '20px 0',
  },
};

export default function PlantingCalendar() {
  const [regionOffset, setRegionOffset] = useState(0);
  const [selectedCrops, setSelectedCrops] = useState(
    CROPS.map((c) => c.id)
  );
  const [spacingCropId, setSpacingCropId] = useState(CROPS[0].id);
  const [bedLength, setBedLength] = useState('200');
  const [bedWidth, setBedWidth] = useState('120');

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.selectedCrops)) setSelectedCrops(data.selectedCrops);
        if (typeof data.regionOffset === 'number') setRegionOffset(data.regionOffset);
        if (data.spacingCropId) setSpacingCropId(data.spacingCropId);
        if (data.bedLength !== undefined) setBedLength(String(data.bedLength));
        if (data.bedWidth !== undefined) setBedWidth(String(data.bedWidth));
      }
    } catch (_) {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selectedCrops, regionOffset, spacingCropId, bedLength, bedWidth })
      );
    } catch (_) {}
  }, [selectedCrops, regionOffset, spacingCropId, bedLength, bedWidth]);

  const toggleCrop = (id) => {
    setSelectedCrops((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const visibleCrops = useMemo(
    () => CROPS.filter((c) => selectedCrops.includes(c.id)),
    [selectedCrops]
  );

  const spacingCrop = useMemo(
    () => CROPS.find((c) => c.id === spacingCropId) || CROPS[0],
    [spacingCropId]
  );

  const spacingResult = useMemo(() => {
    const len = parseFloat(bedLength);
    const wid = parseFloat(bedWidth);
    if (!len || !wid || len <= 0 || wid <= 0) return null;
    const rows = Math.floor(wid / spacingCrop.rowSpacing);
    const perRow = Math.floor(len / spacingCrop.plantSpacing);
    if (rows <= 0 || perRow <= 0) return null;
    return { rows, perRow, total: rows * perRow };
  }, [bedLength, bedWidth, spacingCrop]);

  const getCellType = (crop, monthIndex) => {
    const m = monthIndex + 1;
    const si = shiftRange(crop.sowIndoor, regionOffset);
    const so = shiftRange(crop.sowOutdoor, regionOffset);
    const po = shiftRange(crop.plantOut, regionOffset);
    const ha = shiftRange(crop.harvest, regionOffset);

    if (inRange(m, si)) return 'sowIndoor';
    if (inRange(m, so)) return 'sowOutdoor';
    if (inRange(m, po)) return 'plantOut';
    if (inRange(m, ha)) return 'harvest';
    return 'empty';
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Planting Calendar</h1>
          <p style={styles.subtitle}>
            Sow, plant out &amp; harvest guide — temperate Northern European climate (estimates)
          </p>
        </div>

        {/* Settings */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Settings</div>
          <div style={styles.row}>
            <span style={styles.label}>Climate zone:</span>
            <select
              value={regionOffset}
              onChange={(e) => setRegionOffset(Number(e.target.value))}
              style={styles.select}
            >
              {REGION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crop selection */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Select vegetables</div>
          <div style={styles.chipRow}>
            {CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => toggleCrop(crop.id)}
                style={styles.chip(selectedCrops.includes(crop.id))}
              >
                {crop.name}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Monthly timeline</div>
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={styles.legendSwatch('#fef9c3', '#eab308')} />
              Sow indoors
            </div>
            <div style={styles.legendItem}>
              <div style={styles.legendSwatch('#bfdbfe', '#3b82f6')} />
              Sow outdoors / plant out
            </div>
            <div style={styles.legendItem}>
              <div style={styles.legendSwatch('#bbf7d0', '#16a34a')} />
              Harvest
            </div>
          </div>

          {visibleCrops.length === 0 ? (
            <div style={styles.noSelection}>Select at least one vegetable above.</div>
          ) : (
            <div style={styles.timelineWrap}>
              <div style={styles.timelineGrid}>
                {/* Header row */}
                <div />
                {MONTHS_SHORT.map((m) => (
                  <div key={m} style={styles.timelineHeaderCell}>
                    {m}
                  </div>
                ))}
                {/* Crop rows */}
                {visibleCrops.map((crop) => (
                  <React.Fragment key={crop.id}>
                    <div style={styles.timelineCropLabel} title={crop.name}>
                      {crop.name}
                    </div>
                    {Array.from({ length: 12 }, (_, i) => {
                      const type = getCellType(crop, i);
                      return <div key={i} style={styles.timelineCell(type)} />;
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spacing planner */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Bed spacing planner</div>
          <div style={styles.spacingRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Vegetable</label>
              <select
                value={spacingCropId}
                onChange={(e) => setSpacingCropId(e.target.value)}
                style={styles.select}
              >
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bed length (cm)</label>
              <input
                type="number"
                min="1"
                value={bedLength}
                onChange={(e) => setBedLength(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bed width (cm)</label>
              <input
                type="number"
                min="1"
                value={bedWidth}
                onChange={(e) => setBedWidth(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
            Row spacing: <strong>{spacingCrop.rowSpacing} cm</strong> &nbsp;|&nbsp;
            Plant spacing: <strong>{spacingCrop.plantSpacing} cm</strong>
          </div>

          {spacingResult ? (
            <div style={styles.resultGrid}>
              <div style={styles.resultBox}>
                <div style={styles.resultValue}>{spacingResult.rows}</div>
                <div style={styles.resultLabel}>Rows</div>
              </div>
              <div style={styles.resultBox}>
                <div style={styles.resultValue}>{spacingResult.perRow}</div>
                <div style={styles.resultLabel}>Plants per row</div>
              </div>
              <div style={styles.resultBox}>
                <div style={styles.resultValue}>{spacingResult.total}</div>
                <div style={styles.resultLabel}>Total plants</div>
              </div>
            </div>
          ) : (
            <div style={styles.noSelection}>
              Enter bed dimensions above to see the planting count.
            </div>
          )}
        </div>

        <p style={styles.disclaimer}>
          Dates are rough guides for a temperate Northern European climate and vary
          by year, location, and variety. Always adjust to your local conditions and
          check seed-packet recommendations.
        </p>
      </div>
    </div>
  );
}
