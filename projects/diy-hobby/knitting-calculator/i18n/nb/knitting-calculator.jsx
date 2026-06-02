/**
 * Strikkekalkulator — Halison App Studio-eksempel
 *
 * Tilpass en oppskrift til din egen strikkefasthet og estimer hvor mye garn du trenger.
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

const STORAGE_KEY = 'halison-strikkekalkulator';

const GARNTYKKELSER = [
  { label: 'Lace (tynt blondegarn)',  factor: 1.5 },
  { label: 'Fingering / Sokkegarn',   factor: 2.5 },
  { label: 'Sport',                   factor: 3.5 },
  { label: 'DK',                      factor: 4.5 },
  { label: 'Worsted (tykt)',          factor: 6.0 },
  { label: 'Bulky (ekstra tykt)',     factor: 8.0 },
];

const STANDARD_TILSTAND = {
  dineMasker: '',
  dineOmganger: '',
  bredde: '',
  lengde: '',
  oppskriftMasker: '',
  oppskriftAntall: '',
  garntykkelsIndex: 4,
  areal: '',
  noesteStoerrelse: '50',
};

function sikkertTall(val) {
  const n = parseFloat(val);
  return isFinite(n) && n > 0 ? n : 0;
}

function sikkertDel(a, b) {
  return b !== 0 ? a / b : 0;
}

const stiler = {
  side: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    background: '#fdf2f4',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  kort: {
    width: '100%',
    maxWidth: 480,
    background: '#fff',
    color: '#0f172a',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 10px 40px rgba(225,29,72,0.08)',
    border: '1px solid #fce7ec',
  },
  tittel: {
    margin: '0 0 4px 0',
    fontSize: 22,
    fontWeight: 700,
    color: '#e11d48',
    letterSpacing: '-0.3px',
  },
  undertittel: {
    margin: '0 0 24px 0',
    fontSize: 13,
    color: '#94a3b8',
  },
  seksjon: {
    marginBottom: 24,
  },
  seksjonTittel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#e11d48',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: '1px solid #fce7ec',
  },
  rad: {
    display: 'flex',
    gap: 12,
    marginBottom: 10,
  },
  felt: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  etikett: {
    fontSize: 12,
    fontWeight: 600,
    color: '#475569',
  },
  innfelt: {
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
  velg: {
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
  resultatBoks: {
    background: '#fdf2f4',
    border: '1px solid #fce7ec',
    borderRadius: 10,
    padding: '12px 14px',
    marginTop: 10,
  },
  resultatRad: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  resultatEtikett: {
    fontSize: 13,
    color: '#64748b',
  },
  resultatVerdi: {
    fontSize: 16,
    fontWeight: 700,
    color: '#e11d48',
  },
  resultatMerknad: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 1.4,
  },
  hjelpKnapp: {
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
  ansvarsfraskrivelse: {
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

export default function Strikkekalkulator() {
  const [tilstand, settTilstand] = useState(() => {
    try {
      const lagret = localStorage.getItem(STORAGE_KEY);
      if (lagret) return { ...STANDARD_TILSTAND, ...JSON.parse(lagret) };
    } catch (_) {}
    return STANDARD_TILSTAND;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tilstand));
    } catch (_) {}
  }, [tilstand]);

  function sett(nokkel, verdi) {
    settTilstand(forrige => ({ ...forrige, [nokkel]: verdi }));
  }

  // ── Seksjon 2: masker og omganger fra din strikkefasthet ──
  const leggOpp = useMemo(() => {
    const masker = sikkertTall(tilstand.dineMasker);
    const bredde = sikkertTall(tilstand.bredde);
    if (!masker || !bredde) return null;
    return Math.round(bredde / 10 * masker);
  }, [tilstand.dineMasker, tilstand.bredde]);

  const totaleOmganger = useMemo(() => {
    const omg = sikkertTall(tilstand.dineOmganger);
    const lengde = sikkertTall(tilstand.lengde);
    if (!omg || !lengde) return null;
    return Math.round(lengde / 10 * omg);
  }, [tilstand.dineOmganger, tilstand.lengde]);

  // ── Seksjon 3: tilpasning av oppskriftens maskeantall ──
  const justертAntall = useMemo(() => {
    const dineM = sikkertTall(tilstand.dineMasker);
    const oppskriftM = sikkertTall(tilstand.oppskriftMasker);
    const oppskriftA = sikkertTall(tilstand.oppskriftAntall);
    if (!dineM || !oppskriftM || !oppskriftA) return null;
    return Math.round(oppskriftA * sikkertDel(dineM, oppskriftM));
  }, [tilstand.dineMasker, tilstand.oppskriftMasker, tilstand.oppskriftAntall]);

  // ── Seksjon 4: garnestimering ──
  const garnResultat = useMemo(() => {
    const type = GARNTYKKELSER[tilstand.garntykkelsIndex];
    const areal = sikkertTall(tilstand.areal);
    const noeste = sikkertTall(tilstand.noesteStoerrelse) || 50;
    if (!areal) return null;
    const gram = (areal / 100) * type.factor;
    const noester = Math.ceil(gram / noeste);
    return { gram: Math.round(gram), noester };
  }, [tilstand.areal, tilstand.garntykkelsIndex, tilstand.noesteStoerrelse]);

  function fyllArealFraMaal() {
    const b = sikkertTall(tilstand.bredde);
    const l = sikkertTall(tilstand.lengde);
    if (b && l) {
      sett('areal', String(Math.round(b * l * 2)));
    }
  }

  function inn(nokkel) {
    return {
      style: stiler.innfelt,
      value: tilstand[nokkel],
      onChange: e => sett(nokkel, e.target.value),
      type: 'number',
      min: '0',
      step: 'any',
      onFocus: e => (e.target.style.borderColor = '#e11d48'),
      onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
    };
  }

  return (
    <div style={stiler.side}>
      <div style={stiler.kort}>
        <h1 style={stiler.tittel}>Strikkekalkulator</h1>
        <p style={stiler.undertittel}>Tilpass strikkefasthet, tell masker og anslå garnforbruk</p>

        {/* ── 1. DIN STRIKKEFASTHET ── */}
        <div style={stiler.seksjon}>
          <div style={stiler.seksjonTittel}>1 · Din strikkefasthet (per 10 cm prøvelapp)</div>
          <div style={stiler.rad}>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Masker per 10 cm</label>
              <input {...inn('dineMasker')} placeholder="f.eks. 22" />
            </div>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Omganger per 10 cm</label>
              <input {...inn('dineOmganger')} placeholder="f.eks. 30" />
            </div>
          </div>
        </div>

        {/* ── 2. MASKER OG OMGANGER ── */}
        <div style={stiler.seksjon}>
          <div style={stiler.seksjonTittel}>2 · Plaggets mål → masker og omganger</div>
          <div style={stiler.rad}>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Bredde (cm)</label>
              <input {...inn('bredde')} placeholder="f.eks. 50" />
            </div>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Lengde (cm)</label>
              <input {...inn('lengde')} placeholder="f.eks. 60" />
            </div>
          </div>
          {(leggOpp !== null || totaleOmganger !== null) && (
            <div style={stiler.resultatBoks}>
              {leggOpp !== null && (
                <div style={stiler.resultatRad}>
                  <span style={stiler.resultatEtikett}>Legg opp masker</span>
                  <span style={stiler.resultatVerdi}>{leggOpp}</span>
                </div>
              )}
              {totaleOmganger !== null && (
                <div style={stiler.resultatRad}>
                  <span style={stiler.resultatEtikett}>Totalt antall omganger</span>
                  <span style={stiler.resultatVerdi}>{totaleOmganger}</span>
                </div>
              )}
              <div style={stiler.resultatMerknad}>Anslag — legg til vidde og kantmønster etter behov.</div>
            </div>
          )}
        </div>

        {/* ── 3. TILPASNING AV OPPSKRIFTENS MASKEANTALL ── */}
        <div style={stiler.seksjon}>
          <div style={stiler.seksjonTittel}>3 · Tilpass oppskriftens maskeantall</div>
          <div style={stiler.rad}>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Oppskriftens fasthet (m/10 cm)</label>
              <input {...inn('oppskriftMasker')} placeholder="f.eks. 20" />
            </div>
            <div style={stiler.felt}>
              <label style={stiler.etikett}>Maskeantall i oppskriften</label>
              <input {...inn('oppskriftAntall')} placeholder="f.eks. 100" />
            </div>
          </div>
          {justертAntall !== null && (
            <div style={stiler.resultatBoks}>
              <div style={stiler.resultatRad}>
                <span style={stiler.resultatEtikett}>Justert maskeantall</span>
                <span style={stiler.resultatVerdi}>{justертAntall}</span>
              </div>
              <div style={stiler.resultatMerknad}>
                Bruk dette antallet i stedet for oppskriftens for å beholde samme ferdige størrelse med din strikkefasthet.
              </div>
            </div>
          )}
        </div>

        {/* ── 4. GARNESTIMERING ── */}
        <div style={stiler.seksjon}>
          <div style={stiler.seksjonTittel}>4 · Garnestimering</div>
          <div style={{ marginBottom: 10 }}>
            <label style={stiler.etikett}>Garntykkelse</label>
            <select
              style={{ ...stiler.velg, marginTop: 4 }}
              value={tilstand.garntykkelsIndex}
              onChange={e => sett('garntykkelsIndex', Number(e.target.value))}
            >
              {GARNTYKKELSER.map((g, i) => (
                <option key={g.label} value={i}>
                  {g.label} (~{g.factor} g per 100 cm²)
                </option>
              ))}
            </select>
          </div>
          <div style={stiler.felt}>
            <label style={stiler.etikett}>Areal på plagget (cm²)</label>
            <input {...inn('areal')} placeholder="f.eks. 6000" />
            <button style={stiler.hjelpKnapp} onClick={fyllArealFraMaal} type="button">
              Fyll inn fra bredde × lengde × 2 (for- og bakstykke)
            </button>
          </div>
          <div style={{ ...stiler.felt, marginTop: 10 }}>
            <label style={stiler.etikett}>Nøstestørrelse (g)</label>
            <input {...inn('noesteStoerrelse')} placeholder="50" />
          </div>
          {garnResultat && (
            <div style={stiler.resultatBoks}>
              <div style={stiler.resultatRad}>
                <span style={stiler.resultatEtikett}>Estimert garn</span>
                <span style={stiler.resultatVerdi}>{garnResultat.gram} g</span>
              </div>
              <div style={stiler.resultatRad}>
                <span style={stiler.resultatEtikett}>Antall nøster</span>
                <span style={stiler.resultatVerdi}>{garnResultat.noester}</span>
              </div>
              <div style={stiler.resultatMerknad}>
                Dette er anslag — faktisk garnforbruk varierer med mønster, vidde og strikkefasthet.
                Kjøp ett ekstra nøste for sikkerhets skyld.
              </div>
            </div>
          )}
        </div>

        <div style={stiler.ansvarsfraskrivelse}>
          Alle resultater er anslag. Prøvelapp, mønstervalg og avslutningsarbeid påvirker de faktiske tallene.
          Strikk alltid en prøvelapp og sjekk målene før du setter i gang for alvor.
        </div>
      </div>
    </div>
  );
}
