/**
 * Oppskrift-skalerer — Halison App Studio-eksempel
 *
 * Skaler en oppskrift opp eller ned og regn om mellom vanlige kjøkkenmål.
 *
 * Fra det offentlige Halison App Studio-biblioteket:
 * https://github.com/halisonworks/public-app-studio
 *
 * Tillatt bruk: personlig, pedagogisk og annen ikke-kommersiell bruk.
 * Du kan endre den, men behold denne headeren og kildelenken, og du kan ikke
 * selge, kommersialisere eller republisere den. Utgitt under Halison App
 * Studio Examples License — se LICENSE-filen i repoet over.
 */

import React, { useState, useMemo, useEffect } from 'react';

const STORAGE_KEY = 'halison-oppskrift-skalerer';

const TETTHET_PRESETS = [
  { label: 'Mel', tetthet: 0.53 },
  { label: 'Sukker', tetthet: 0.85 },
  { label: 'Smør', tetthet: 0.96 },
  { label: 'Vann / væske', tetthet: 1.0 },
  { label: 'Honning', tetthet: 1.42 },
  { label: 'Annet (angi tetthet)', tetthet: null },
];

// Volum i ml for hver enhet
const ENHET_ML = {
  ml: 1,
  dl: 100,
  l: 1000,
  ss: 15,
  ts: 5,
};

const FRØINGREDIENSLISTE = [
  { id: 1, navn: 'Hvetemel', mengde: '300', enhet: 'g' },
  { id: 2, navn: 'Sukker', mengde: '150', enhet: 'g' },
  { id: 3, navn: 'Smør', mengde: '100', enhet: 'g' },
];

function nesteId(liste) {
  return liste.length === 0 ? 1 : Math.max(...liste.map((r) => r.id)) + 1;
}

function rundNice(n) {
  if (!isFinite(n) || n === 0) return '0';
  const mag = Math.floor(Math.log10(Math.abs(n)));
  const faktor = Math.pow(10, 1 - mag);
  return String(Math.round(n * faktor) / faktor);
}

function konverterEnheter(verdi, fraEnhet, tilEnhet, tetthet) {
  const volEnheter = new Set(Object.keys(ENHET_ML));
  const vektEnheter = new Set(['g', 'kg']);

  const fraErVol = volEnheter.has(fraEnhet);
  const fraErVekt = vektEnheter.has(fraEnhet);
  const tilErVol = volEnheter.has(tilEnhet);
  const tilErVekt = vektEnheter.has(tilEnhet);

  let baseMl = null;
  let baseG = null;

  if (fraErVol) {
    baseMl = verdi * ENHET_ML[fraEnhet];
  } else if (fraEnhet === 'g') {
    baseG = verdi;
  } else if (fraEnhet === 'kg') {
    baseG = verdi * 1000;
  }

  // Kryss-konvertering volum <-> vekt via tetthet
  if (baseMl !== null && tilErVekt) {
    if (!tetthet) return null;
    baseG = baseMl * tetthet;
    baseMl = null;
  } else if (baseG !== null && tilErVol) {
    if (!tetthet) return null;
    baseMl = baseG / tetthet;
    baseG = null;
  }

  if (tilErVol && baseMl !== null) {
    return baseMl / ENHET_ML[tilEnhet];
  } else if (tilEnhet === 'g' && baseG !== null) {
    return baseG;
  } else if (tilEnhet === 'kg' && baseG !== null) {
    return baseG / 1000;
  }

  return null;
}

export default function OppskriftSkalerer() {
  const [ingredienser, setIngredienser] = useState(FRØINGREDIENSLISTE);
  const [origPorsjoner, setOrigPorsjoner] = useState('4');
  const [onskePorsjoner, setOnskePorsjoner] = useState('4');
  const [lastet, setLastet] = useState(false);

  // Omregnerstatus
  const [konvVerdi, setKonvVerdi] = useState('');
  const [konvFra, setKonvFra] = useState('g');
  const [konvTil, setKonvTil] = useState('ml');
  const [presetIdx, setPresetIdx] = useState(3); // Vann standard
  const [egentetthet, setEgentetthet] = useState('1.0');

  // Last fra localStorage
  useEffect(() => {
    try {
      const lagret = localStorage.getItem(STORAGE_KEY);
      if (lagret) {
        const data = JSON.parse(lagret);
        if (data.ingredienser) setIngredienser(data.ingredienser);
        if (data.origPorsjoner) setOrigPorsjoner(data.origPorsjoner);
        if (data.onskePorsjoner) setOnskePorsjoner(data.onskePorsjoner);
      }
    } catch (_) {}
    setLastet(true);
  }, []);

  // Lagre til localStorage
  useEffect(() => {
    if (!lastet) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ingredienser, origPorsjoner, onskePorsjoner })
      );
    } catch (_) {}
  }, [ingredienser, origPorsjoner, onskePorsjoner, lastet]);

  const skaleringsfaktor = useMemo(() => {
    const orig = Math.max(1, parseFloat(origPorsjoner) || 1);
    const onske = Math.max(1, parseFloat(onskePorsjoner) || 1);
    return onske / orig;
  }, [origPorsjoner, onskePorsjoner]);

  function oppdaterIngrediens(id, felt, verdi) {
    setIngredienser((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [felt]: verdi } : r))
    );
  }

  function leggTilIngrediens() {
    setIngredienser((prev) => [
      ...prev,
      { id: nesteId(prev), navn: '', mengde: '1', enhet: 'g' },
    ]);
  }

  function fjernIngrediens(id) {
    setIngredienser((prev) => prev.filter((r) => r.id !== id));
  }

  const tetthet = useMemo(() => {
    const preset = TETTHET_PRESETS[presetIdx];
    if (preset.tetthet !== null) return preset.tetthet;
    return Math.max(0.001, parseFloat(egentetthet) || 1.0);
  }, [presetIdx, egentetthet]);

  const konvResultat = useMemo(() => {
    const v = parseFloat(konvVerdi);
    if (!isFinite(v) || v === 0 || konvFra === konvTil) return null;
    return konverterEnheter(v, konvFra, konvTil, tetthet);
  }, [konvVerdi, konvFra, konvTil, tetthet]);

  const trengerTetthet =
    (Object.keys(ENHET_ML).includes(konvFra) && ['g', 'kg'].includes(konvTil)) ||
    (['g', 'kg'].includes(konvFra) && Object.keys(ENHET_ML).includes(konvTil));

  const s = stiler;

  return (
    <div style={s.side}>
      <div style={s.kort}>
        <h1 style={s.tittel}>Oppskrift-skalerer</h1>

        {/* Porsjoner */}
        <section style={s.seksjon}>
          <h2 style={s.seksjontittel}>Porsjoner</h2>
          <div style={s.rad2}>
            <div style={s.felt}>
              <label style={s.etikett}>Originale porsjoner</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="1"
                value={origPorsjoner}
                onChange={(e) => setOrigPorsjoner(e.target.value)}
              />
            </div>
            <div style={s.felt}>
              <label style={s.etikett}>Ønskede porsjoner</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="1"
                value={onskePorsjoner}
                onChange={(e) => setOnskePorsjoner(e.target.value)}
              />
            </div>
          </div>
          <div style={s.faktorbadge}>
            Skaleringsfaktor: <strong style={s.aksent}>×{skaleringsfaktor.toFixed(2)}</strong>
          </div>
        </section>

        {/* Ingrediensliste */}
        <section style={s.seksjon}>
          <h2 style={s.seksjontittel}>Ingredienser</h2>
          <div style={s.tabellhode}>
            <span style={{ flex: 3 }}>Navn</span>
            <span style={{ flex: 1.4, textAlign: 'right' }}>Mengde</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Enhet</span>
            <span style={{ flex: 1.4, textAlign: 'right', color: '#d97706' }}>Skalert</span>
            <span style={{ width: 28 }} />
          </div>
          {ingredienser.map((ing) => {
            const origMengde = parseFloat(ing.mengde) || 0;
            const skalertMengde = origMengde * skaleringsfaktor;
            return (
              <div key={ing.id} style={s.tabellrad}>
                <input
                  style={{ ...s.celleinput, flex: 3 }}
                  type="text"
                  placeholder="Ingrediensnavn"
                  value={ing.navn}
                  onChange={(e) => oppdaterIngrediens(ing.id, 'navn', e.target.value)}
                />
                <input
                  style={{ ...s.celleinput, flex: 1.4, textAlign: 'right' }}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder="0"
                  value={ing.mengde}
                  onChange={(e) => oppdaterIngrediens(ing.id, 'mengde', e.target.value)}
                />
                <input
                  style={{ ...s.celleinput, flex: 1, textAlign: 'center' }}
                  type="text"
                  placeholder="g"
                  value={ing.enhet}
                  onChange={(e) => oppdaterIngrediens(ing.id, 'enhet', e.target.value)}
                />
                <span style={{ flex: 1.4, textAlign: 'right', color: '#d97706', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {origMengde === 0 ? '—' : `${rundNice(skalertMengde)} ${ing.enhet}`}
                </span>
                <button
                  style={s.fjernknapp}
                  onClick={() => fjernIngrediens(ing.id)}
                  title="Fjern"
                >
                  ×
                </button>
              </div>
            );
          })}
          <button style={s.leggTilKnapp} onClick={leggTilIngrediens}>
            + Legg til ingrediens
          </button>
        </section>

        {/* Enhetsomregner */}
        <section style={s.seksjon}>
          <h2 style={s.seksjontittel}>Enhetsomregner</h2>

          <div style={s.felt}>
            <label style={s.etikett}>Ingrediens-preset (for volum ↔ vekt)</label>
            <select
              style={s.select}
              value={presetIdx}
              onChange={(e) => setPresetIdx(Number(e.target.value))}
            >
              {TETTHET_PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  {p.label}
                  {p.tetthet !== null ? ` (${p.tetthet} g/ml)` : ''}
                </option>
              ))}
            </select>
          </div>

          {TETTHET_PRESETS[presetIdx].tetthet === null && (
            <div style={s.felt}>
              <label style={s.etikett}>Egendefinert tetthet (g/ml)</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                min="0.001"
                step="0.01"
                value={egentetthet}
                onChange={(e) => setEgentetthet(e.target.value)}
              />
            </div>
          )}

          <div style={s.rad2}>
            <div style={s.felt}>
              <label style={s.etikett}>Verdi</label>
              <input
                style={s.input}
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={konvVerdi}
                onChange={(e) => setKonvVerdi(e.target.value)}
              />
            </div>
            <div style={s.felt}>
              <label style={s.etikett}>Fra</label>
              <select
                style={s.select}
                value={konvFra}
                onChange={(e) => setKonvFra(e.target.value)}
              >
                {['ml', 'dl', 'l', 'ss', 'ts', 'g', 'kg'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div style={s.felt}>
              <label style={s.etikett}>Til</label>
              <select
                style={s.select}
                value={konvTil}
                onChange={(e) => setKonvTil(e.target.value)}
              >
                {['ml', 'dl', 'l', 'ss', 'ts', 'g', 'kg'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {trengerTetthet && (
            <p style={s.hint}>
              Konvertering mellom volum og vekt bruker tettheten valgt over.
            </p>
          )}

          <div style={s.resultatboks}>
            {konvVerdi === '' ? (
              <span style={{ color: '#94a3b8' }}>Skriv inn en verdi over</span>
            ) : konvFra === konvTil ? (
              <span style={{ color: '#94a3b8' }}>Samme enhet — ingen omregning nødvendig</span>
            ) : konvResultat === null ? (
              <span style={{ color: '#ef4444' }}>
                Kan ikke regne om — tetthet kreves for volum ↔ vekt
              </span>
            ) : (
              <>
                <span style={{ color: '#475569' }}>
                  {konvVerdi} {konvFra} =
                </span>{' '}
                <strong style={s.aksent}>
                  {rundNice(konvResultat)} {konvTil}
                </strong>
              </>
            )}
          </div>
        </section>

        {/* Steketids-merknad */}
        <div style={s.stekenote}>
          <strong>Steketid og -temperatur:</strong> Steketid og -temperatur skalerer
          ikke med mengden — behold temperaturen og følg med på når retten er ferdig.
          Større porsjoner kan trenge litt lengre steketid.
        </div>
      </div>
    </div>
  );
}

const stiler = {
  side: {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '32px 16px',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  kort: {
    width: '100%',
    maxWidth: 560,
    background: '#ffffff',
    borderRadius: 16,
    padding: '28px 28px 32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  },
  tittel: {
    margin: '0 0 24px',
    fontSize: 26,
    fontWeight: 800,
    color: '#1e293b',
    borderBottom: '3px solid #d97706',
    paddingBottom: 10,
  },
  seksjon: {
    marginBottom: 28,
  },
  seksjontittel: {
    margin: '0 0 12px',
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#d97706',
  },
  rad2: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  felt: {
    flex: 1,
    minWidth: 120,
    marginBottom: 12,
  },
  etikett: {
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
  faktorbadge: {
    display: 'inline-block',
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 14,
    color: '#78350f',
    marginTop: 4,
  },
  aksent: {
    color: '#d97706',
  },
  tabellhode: {
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
  tabellrad: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  celleinput: {
    padding: '7px 8px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#1e293b',
    boxSizing: 'border-box',
    minWidth: 0,
  },
  fjernknapp: {
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
  leggTilKnapp: {
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
  resultatboks: {
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
  stekenote: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    color: '#78350f',
    lineHeight: 1.5,
  },
};
