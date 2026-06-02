/**
 * Materialkalkulator — Halison App Studio-eksempel
 *
 * Estimer maling, gulv og trelast til en jobb, med kostnad.
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

const STORAGE_KEY = 'halison-materialkalkulator';

const DEFAULT_KAPP = [
  { label: 'Hylle', lengde: '80', antall: '3' },
  { label: 'Støtte', lengde: '40', antall: '4' },
];

const DEFAULT_STATE = {
  modus: 'maling',
  valuta: 'kr',

  // Maling
  malingArealModus: 'direkte',
  malingAreal: '',
  malingOmkrets: '',
  malingHoyde: '',
  malingApninger: '0',
  malingDekkevne: '10',
  malingStrok: '2',
  malingPrisPerLiter: '',

  // Gulv
  gulvArealModus: 'direkte',
  gulvAreal: '',
  gulvLengde: '',
  gulvBredde: '',
  gulvSvinn: '10',
  gulvPakkeAreal: '2.0',
  gulvPrisPerPakke: '',

  // Trelast
  trelastBordLengde: '240',
  trelastPrisPerBord: '',
  kapp: DEFAULT_KAPP,
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
  kappTabell: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 8,
    fontSize: 13,
  },
  kappTh: {
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 700,
    color: '#64748b',
    paddingBottom: 4,
  },
  kappTd: {
    padding: '3px 4px 3px 0',
    verticalAlign: 'middle',
  },
  kappInput: {
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
  fjernKnapp: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    padding: '0 4px',
  },
  leggTilKnapp: {
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

function feltProps(verdi, onChange, placeholder, type = 'number') {
  return {
    style: styles.input,
    value: verdi,
    onChange,
    placeholder,
    type,
    min: type === 'number' ? '0' : undefined,
    step: type === 'number' ? 'any' : undefined,
    onFocus: e => (e.target.style.borderColor = '#2563eb'),
    onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
  };
}

function kappFeltProps(verdi, onChange, placeholder, type = 'text') {
  return {
    style: styles.kappInput,
    value: verdi,
    onChange,
    placeholder,
    type,
    min: type === 'number' ? '0' : undefined,
    step: type === 'number' ? 'any' : undefined,
    onFocus: e => (e.target.style.borderColor = '#2563eb'),
    onBlur: e => (e.target.style.borderColor = '#e2e8f0'),
  };
}

function penger(valuta, belop) {
  const sym = (valuta || 'kr').trim();
  return `${fmt(belop)} ${sym}`;
}

export default function Materialkalkulator() {
  const [state, setState] = useState(() => {
    try {
      const lagret = localStorage.getItem(STORAGE_KEY);
      if (lagret) {
        const parsed = JSON.parse(lagret);
        return { ...DEFAULT_STATE, ...parsed, kapp: parsed.kapp || DEFAULT_KAPP };
      }
    } catch (_) {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  function sett(nokkel, verdi) {
    setState(prev => ({ ...prev, [nokkel]: verdi }));
  }

  function settKapp(idx, felt, verdi) {
    setState(prev => {
      const kapp = prev.kapp.map((k, i) => i === idx ? { ...k, [felt]: verdi } : k);
      return { ...prev, kapp };
    });
  }

  function leggTilKapp() {
    setState(prev => ({ ...prev, kapp: [...prev.kapp, { label: '', lengde: '', antall: '1' }] }));
  }

  function fjernKapp(idx) {
    setState(prev => ({ ...prev, kapp: prev.kapp.filter((_, i) => i !== idx) }));
  }

  // ── MALINGS-KALKULATOR ──
  const malingResultat = useMemo(() => {
    let areal = 0;
    if (state.malingArealModus === 'direkte') {
      areal = safeNum(state.malingAreal);
    } else {
      areal = safeNum(state.malingOmkrets) * safeNum(state.malingHoyde);
    }
    areal = Math.max(0, areal - safeNum(state.malingApninger));
    const dekkevne = safeNum(state.malingDekkevne) || 10;
    const strok = safeNum(state.malingStrok) || 1;
    const rawLiter = (areal * strok) / dekkevne;
    const liter = Math.ceil(rawLiter);
    const pris = safeNum(state.malingPrisPerLiter);
    const kostnad = liter * pris;
    return { areal: areal.toFixed(2), rawLiter: rawLiter.toFixed(2), liter, kostnad };
  }, [
    state.malingArealModus, state.malingAreal, state.malingOmkrets, state.malingHoyde,
    state.malingApninger, state.malingDekkevne, state.malingStrok, state.malingPrisPerLiter,
  ]);

  // ── GULV-KALKULATOR ──
  const gulvResultat = useMemo(() => {
    let areal = 0;
    if (state.gulvArealModus === 'direkte') {
      areal = safeNum(state.gulvAreal);
    } else {
      areal = safeNum(state.gulvLengde) * safeNum(state.gulvBredde);
    }
    const svinn = safeNum(state.gulvSvinn);
    const arealMedSvinn = areal * (1 + svinn / 100);
    const pakkeAreal = safeNum(state.gulvPakkeAreal) || 1;
    const pakker = Math.ceil(arealMedSvinn / pakkeAreal);
    const pris = safeNum(state.gulvPrisPerPakke);
    const kostnad = pakker * pris;
    return { areal: areal.toFixed(2), arealMedSvinn: arealMedSvinn.toFixed(2), pakker, kostnad };
  }, [
    state.gulvArealModus, state.gulvAreal, state.gulvLengde, state.gulvBredde,
    state.gulvSvinn, state.gulvPakkeAreal, state.gulvPrisPerPakke,
  ]);

  // ── TRELAST-KALKULATOR ──
  const trelastResultat = useMemo(() => {
    const bordLengde = safeNum(state.trelastBordLengde) || 240;
    const totalLengde = state.kapp.reduce((sum, k) => {
      return sum + safeNum(k.lengde) * safeNum(k.antall);
    }, 0);
    const bord = Math.ceil(totalLengde / bordLengde);
    const pris = safeNum(state.trelastPrisPerBord);
    const kostnad = bord * pris;
    return {
      totalLengdeCm: totalLengde.toFixed(0),
      totalLengdeM: (totalLengde / 100).toFixed(2),
      bord,
      kostnad,
    };
  }, [state.kapp, state.trelastBordLengde, state.trelastPrisPerBord]);

  const harMalingPris = safeNum(state.malingPrisPerLiter) > 0;
  const harGulvPris = safeNum(state.gulvPrisPerPakke) > 0;
  const harTrelastPris = safeNum(state.trelastPrisPerBord) > 0;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Materialkalkulator</h1>
        <p style={styles.subtitle}>Estimer maling, gulv / fliser og trelast med kostnad</p>

        {/* Valuta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Valutasymbol:</span>
          <input
            {...feltProps(state.valuta, e => sett('valuta', e.target.value), 'kr', 'text')}
            style={{ ...styles.input, width: 60, textAlign: 'center' }}
          />
        </div>

        {/* Fanerekke */}
        <div style={styles.tabBar}>
          {[['maling', 'Maling'], ['gulv', 'Gulv / fliser'], ['trelast', 'Trelast']].map(([key, label]) => (
            <button key={key} style={styles.tab(state.modus === key)} onClick={() => sett('modus', key)} type="button">
              {label}
            </button>
          ))}
        </div>

        {/* ── MALING ── */}
        {state.modus === 'maling' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Veggareal</div>
              <div style={styles.toggleRow}>
                <button style={styles.toggleBtn(state.malingArealModus === 'direkte')} type="button"
                  onClick={() => sett('malingArealModus', 'direkte')}>Skriv inn areal (m²)</button>
                <button style={styles.toggleBtn(state.malingArealModus === 'hjelper')} type="button"
                  onClick={() => sett('malingArealModus', 'hjelper')}>Omkrets + høyde</button>
              </div>

              {state.malingArealModus === 'direkte' ? (
                <div style={styles.fieldFull}>
                  <label style={styles.label}>Veggareal som skal males (m²)</label>
                  <input {...feltProps(state.malingAreal, e => sett('malingAreal', e.target.value), 'f.eks. 40')} />
                </div>
              ) : (
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Romomkrets (m)</label>
                    <input {...feltProps(state.malingOmkrets, e => sett('malingOmkrets', e.target.value), 'f.eks. 16')} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Takhøyde (m)</label>
                    <input {...feltProps(state.malingHoyde, e => sett('malingHoyde', e.target.value), 'f.eks. 2,4')} />
                  </div>
                </div>
              )}

              <div style={styles.fieldFull}>
                <label style={styles.label}>Åpninger som trekkes fra — dører og vinduer (m²)</label>
                <input {...feltProps(state.malingApninger, e => sett('malingApninger', e.target.value), '0')} />
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Dekkevne og strøk</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Dekkevne (m² / liter / strøk)</label>
                  <input {...feltProps(state.malingDekkevne, e => sett('malingDekkevne', e.target.value), '10')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Antall strøk</label>
                  <input {...feltProps(state.malingStrok, e => sett('malingStrok', e.target.value), '2')} />
                </div>
              </div>
              <div style={styles.fieldFull}>
                <label style={styles.label}>Pris per liter ({state.valuta || 'kr'})</label>
                <input {...feltProps(state.malingPrisPerLiter, e => sett('malingPrisPerLiter', e.target.value), 'valgfritt')} />
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Veggareal</span>
                <span style={styles.resultValue}>{malingResultat.areal} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Liter maling (rundet opp)</span>
                <span style={styles.resultValue}>{malingResultat.liter} L</span>
              </div>
              <div style={{ ...styles.resultRow, marginBottom: 0 }}>
                <span style={{ ...styles.resultLabel, fontSize: 11 }}>Eksakt: {malingResultat.rawLiter} L</span>
              </div>
              {harMalingPris && (
                <div style={{ ...styles.resultRow, marginTop: 8 }}>
                  <span style={styles.resultLabel}>Estimert kostnad</span>
                  <span style={styles.resultValue}>{penger(state.valuta, malingResultat.kostnad)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                Dette er anslag — kjøp litt ekstra for svinn, kapp og variasjon i dekkevne.
                Dekkevne varierer med malingstype, underlag og påføringsmåte.
              </div>
            </div>
          </>
        )}

        {/* ── GULV / FLISER ── */}
        {state.modus === 'gulv' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Romareal</div>
              <div style={styles.toggleRow}>
                <button style={styles.toggleBtn(state.gulvArealModus === 'direkte')} type="button"
                  onClick={() => sett('gulvArealModus', 'direkte')}>Skriv inn areal (m²)</button>
                <button style={styles.toggleBtn(state.gulvArealModus === 'hjelper')} type="button"
                  onClick={() => sett('gulvArealModus', 'hjelper')}>Lengde × bredde</button>
              </div>

              {state.gulvArealModus === 'direkte' ? (
                <div style={styles.fieldFull}>
                  <label style={styles.label}>Romareal (m²)</label>
                  <input {...feltProps(state.gulvAreal, e => sett('gulvAreal', e.target.value), 'f.eks. 18')} />
                </div>
              ) : (
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Lengde (m)</label>
                    <input {...feltProps(state.gulvLengde, e => sett('gulvLengde', e.target.value), 'f.eks. 5')} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Bredde (m)</label>
                    <input {...feltProps(state.gulvBredde, e => sett('gulvBredde', e.target.value), 'f.eks. 3,6')} />
                  </div>
                </div>
              )}
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Svinn og pakker</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Svinn % (for kapp og avkapp)</label>
                  <input {...feltProps(state.gulvSvinn, e => sett('gulvSvinn', e.target.value), '10')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Pakke / eske dekning (m²)</label>
                  <input {...feltProps(state.gulvPakkeAreal, e => sett('gulvPakkeAreal', e.target.value), '2.0')} />
                </div>
              </div>
              <div style={styles.fieldFull}>
                <label style={styles.label}>Pris per pakke ({state.valuta || 'kr'})</label>
                <input {...feltProps(state.gulvPrisPerPakke, e => sett('gulvPrisPerPakke', e.target.value), 'valgfritt')} />
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Grunnflate</span>
                <span style={styles.resultValue}>{gulvResultat.areal} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Areal inkl. svinn</span>
                <span style={styles.resultValue}>{gulvResultat.arealMedSvinn} m²</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Pakker (rundet opp)</span>
                <span style={styles.resultValue}>{gulvResultat.pakker}</span>
              </div>
              {harGulvPris && (
                <div style={{ ...styles.resultRow, marginTop: 4 }}>
                  <span style={styles.resultLabel}>Estimert kostnad</span>
                  <span style={styles.resultValue}>{penger(state.valuta, gulvResultat.kostnad)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                Dette er anslag — kjøp litt ekstra for svinn, kapp og variasjon i dekkevne.
                For diagonalt eller fiskebensmønster bør du legge til ekstra svinn.
              </div>
            </div>
          </>
        )}

        {/* ── TRELAST ── */}
        {state.modus === 'trelast' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Kappliste</div>
              <table style={styles.kappTabell}>
                <thead>
                  <tr>
                    <th style={styles.kappTh}>Betegnelse</th>
                    <th style={{ ...styles.kappTh, width: 90 }}>Lengde (cm)</th>
                    <th style={{ ...styles.kappTh, width: 60 }}>Antall</th>
                    <th style={{ width: 30 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {state.kapp.map((k, idx) => (
                    <tr key={idx}>
                      <td style={styles.kappTd}>
                        <input
                          {...kappFeltProps(k.label, e => settKapp(idx, 'label', e.target.value), 'f.eks. Hylle')}
                        />
                      </td>
                      <td style={styles.kappTd}>
                        <input
                          {...kappFeltProps(k.lengde, e => settKapp(idx, 'lengde', e.target.value), '80', 'number')}
                        />
                      </td>
                      <td style={styles.kappTd}>
                        <input
                          {...kappFeltProps(k.antall, e => settKapp(idx, 'antall', e.target.value), '1', 'number')}
                        />
                      </td>
                      <td style={styles.kappTd}>
                        <button style={styles.fjernKnapp} type="button" onClick={() => fjernKapp(idx)}
                          title="Fjern rad">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.leggTilKnapp} type="button" onClick={leggTilKapp}>+ Legg til lengde</button>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Bordlengde og pris</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Bordlengde fra butikk (cm)</label>
                  <input {...feltProps(state.trelastBordLengde, e => sett('trelastBordLengde', e.target.value), '240')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Pris per bord ({state.valuta || 'kr'})</label>
                  <input {...feltProps(state.trelastPrisPerBord, e => sett('trelastPrisPerBord', e.target.value), 'valgfritt')} />
                </div>
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Total lengde</span>
                <span style={styles.resultValue}>{trelastResultat.totalLengdeM} m ({trelastResultat.totalLengdeCm} cm)</span>
              </div>
              <div style={styles.resultRow}>
                <span style={styles.resultLabel}>Bord (rundet opp)</span>
                <span style={styles.resultValue}>{trelastResultat.bord}</span>
              </div>
              {harTrelastPris && (
                <div style={{ ...styles.resultRow, marginTop: 4 }}>
                  <span style={styles.resultLabel}>Estimert kostnad</span>
                  <span style={styles.resultValue}>{penger(state.valuta, trelastResultat.kostnad)}</span>
                </div>
              )}
              <div style={styles.resultNote}>
                Antall bord = total lengde ÷ bordlengde, rundet opp. Virkelig kappliste avhenger av
                hvordan lengdene passer på hvert bord — kjøp et par ekstra for avkapp og feil.
              </div>
            </div>
          </>
        )}

        <div style={styles.disclaimer}>
          Dette er anslag — kjøp litt ekstra for svinn, kapp og variasjon i dekkevne.
          Kontroller alltid mål på stedet før du bestiller.
        </div>
      </div>
    </div>
  );
}
