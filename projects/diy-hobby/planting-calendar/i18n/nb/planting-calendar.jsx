/**
 * Plantekalender — Halison App Studio-eksempel
 *
 * Planlegg når du skal så, plante ut og høste grønnsakene dine, med planteavstand.
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

const GRØNNSAKER = [
  {
    id: 'tomat',
    name: 'Tomat',
    såInn: [3, 4],
    såUte: [],
    planteUt: [6, 6],
    høst: [8, 10],
    radavstand: 60,
    planteavstand: 45,
  },
  {
    id: 'salat',
    name: 'Salat',
    såInn: [],
    såUte: [4, 7],
    planteUt: [],
    høst: [6, 9],
    radavstand: 30,
    planteavstand: 25,
  },
  {
    id: 'gulrot',
    name: 'Gulrot',
    såInn: [],
    såUte: [4, 6],
    planteUt: [],
    høst: [7, 10],
    radavstand: 25,
    planteavstand: 5,
  },
  {
    id: 'potet',
    name: 'Potet',
    såInn: [],
    såUte: [],
    planteUt: [5, 5],
    høst: [8, 9],
    radavstand: 60,
    planteavstand: 30,
  },
  {
    id: 'erter',
    name: 'Erter',
    såInn: [],
    såUte: [4, 6],
    planteUt: [],
    høst: [7, 8],
    radavstand: 45,
    planteavstand: 5,
  },
  {
    id: 'reddik',
    name: 'Reddik',
    såInn: [],
    såUte: [4, 8],
    planteUt: [],
    høst: [5, 9],
    radavstand: 15,
    planteavstand: 3,
  },
  {
    id: 'rødbete',
    name: 'Rødbete',
    såInn: [],
    såUte: [4, 6],
    planteUt: [],
    høst: [7, 10],
    radavstand: 30,
    planteavstand: 8,
  },
  {
    id: 'løk',
    name: 'Løk',
    såInn: [],
    såUte: [],
    planteUt: [4, 5],
    høst: [8, 9],
    radavstand: 25,
    planteavstand: 10,
  },
  {
    id: 'grønnkål',
    name: 'Grønnkål',
    såInn: [3, 4],
    såUte: [],
    planteUt: [5, 6],
    høst: [8, 11],
    radavstand: 50,
    planteavstand: 40,
  },
  {
    id: 'agurk',
    name: 'Agurk',
    såInn: [4, 5],
    såUte: [],
    planteUt: [6, 6],
    høst: [7, 9],
    radavstand: 60,
    planteavstand: 40,
  },
  {
    id: 'spinat',
    name: 'Spinat',
    såInn: [],
    såUte: [4, 8],
    planteUt: [],
    høst: [5, 10],
    radavstand: 25,
    planteavstand: 8,
  },
  {
    id: 'jordbær',
    name: 'Jordbær',
    såInn: [],
    såUte: [],
    planteUt: [4, 5],
    høst: [6, 7],
    radavstand: 40,
    planteavstand: 30,
  },
];

const MÅNEDER_KORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];

const SONE_VALG = [
  { value: -1, label: 'Mildt / kyst (tidligere)' },
  { value: 0, label: 'Gjennomsnitt' },
  { value: 1, label: 'Kaldt / innland (senere)' },
];

const STORAGE_KEY = 'halison-plantekalender';

function klamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function forskyvRange(range, offset) {
  if (!range || range.length === 0) return [];
  return [klamp(range[0] + offset, 1, 12), klamp(range[1] + offset, 1, 12)];
}

function iRange(måned, range) {
  if (!range || range.length < 2) return false;
  const [start, end] = range;
  if (start <= end) return måned >= start && måned <= end;
  return måned >= start || måned <= end;
}

const stiler = {
  side: {
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
  tittel: {
    fontSize: 26,
    fontWeight: 700,
    color: '#16a34a',
    margin: '0 0 4px',
  },
  undertittel: {
    fontSize: 14,
    color: '#64748b',
    margin: 0,
  },
  kort: {
    background: '#ffffff',
    borderRadius: 12,
    padding: '20px 24px',
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  kortTittel: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 14px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  rad: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  etikett: {
    fontSize: 13,
    color: '#475569',
    fontWeight: 500,
  },
  velg: {
    padding: '7px 10px',
    borderRadius: 7,
    border: '1px solid #cbd5e1',
    background: '#fff',
    fontSize: 13,
    color: '#1e293b',
    cursor: 'pointer',
  },
  brikkeRad: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  brikke: (aktiv) => ({
    padding: '5px 13px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    border: '1.5px solid',
    borderColor: aktiv ? '#16a34a' : '#cbd5e1',
    background: aktiv ? '#dcfce7' : '#f8fafc',
    color: aktiv ? '#15803d' : '#64748b',
    userSelect: 'none',
    transition: 'background 0.15s, color 0.15s',
  }),
  tidslinjePakke: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  tidslinjeGrid: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(12, minmax(36px, 1fr))',
    gap: '2px 2px',
    minWidth: 580,
  },
  tidslinjeHeaderCelle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#94a3b8',
    textAlign: 'center',
    padding: '4px 0',
    userSelect: 'none',
  },
  tidslinjeGrønnsakEtikett: {
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
  tidslinjeCelle: (type) => {
    const farger = {
      såInn: { bg: '#fef9c3', border: '#eab308' },
      såUte: { bg: '#bfdbfe', border: '#3b82f6' },
      planteUt: { bg: '#bfdbfe', border: '#3b82f6' },
      høst: { bg: '#bbf7d0', border: '#16a34a' },
      tom: { bg: 'transparent', border: 'transparent' },
    };
    const f = farger[type] || farger.tom;
    return {
      background: f.bg,
      borderRadius: 4,
      border: `1.5px solid ${f.border}`,
      height: 26,
    };
  },
  forklaring: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 20px',
    marginBottom: 14,
    fontSize: 12,
    color: '#475569',
  },
  forklaringElement: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  forklaringFarge: (farge, kant) => ({
    width: 14,
    height: 14,
    borderRadius: 3,
    background: farge,
    border: `1.5px solid ${kant}`,
    flexShrink: 0,
  }),
  avstandsRad: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  inndataGruppe: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 110,
  },
  inndata: {
    padding: '8px 10px',
    borderRadius: 7,
    border: '1px solid #cbd5e1',
    background: '#fff',
    fontSize: 14,
    color: '#1e293b',
    width: '100%',
    boxSizing: 'border-box',
  },
  resultatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 10,
    marginTop: 4,
  },
  resultatBoks: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 8,
    padding: '10px 14px',
    textAlign: 'center',
  },
  resultatVerdi: {
    fontSize: 22,
    fontWeight: 700,
    color: '#16a34a',
    lineHeight: 1.2,
  },
  resultatEtikett: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  merknad: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 16,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  ingenValg: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    padding: '20px 0',
  },
};

export default function Plantekalender() {
  const [soneOffset, setSoneOffset] = useState(0);
  const [valgteGrønnsaker, setValgteGrønnsaker] = useState(
    GRØNNSAKER.map((g) => g.id)
  );
  const [avstandsGrønnsakId, setAvstandsGrønnsakId] = useState(GRØNNSAKER[0].id);
  const [bedLengde, setBedLengde] = useState('200');
  const [bedBredde, setBedBredde] = useState('120');

  // Gjenopprett fra localStorage ved oppstart
  useEffect(() => {
    try {
      const lagret = localStorage.getItem(STORAGE_KEY);
      if (lagret) {
        const data = JSON.parse(lagret);
        if (Array.isArray(data.valgteGrønnsaker)) setValgteGrønnsaker(data.valgteGrønnsaker);
        if (typeof data.soneOffset === 'number') setSoneOffset(data.soneOffset);
        if (data.avstandsGrønnsakId) setAvstandsGrønnsakId(data.avstandsGrønnsakId);
        if (data.bedLengde !== undefined) setBedLengde(String(data.bedLengde));
        if (data.bedBredde !== undefined) setBedBredde(String(data.bedBredde));
      }
    } catch (_) {}
  }, []);

  // Lagre til localStorage ved endring
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ valgteGrønnsaker, soneOffset, avstandsGrønnsakId, bedLengde, bedBredde })
      );
    } catch (_) {}
  }, [valgteGrønnsaker, soneOffset, avstandsGrønnsakId, bedLengde, bedBredde]);

  const byttGrønnsak = (id) => {
    setValgteGrønnsaker((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const valgteGrønnsaker_ = useMemo(
    () => GRØNNSAKER.filter((g) => valgteGrønnsaker.includes(g.id)),
    [valgteGrønnsaker]
  );

  const avstandsGrønnsak = useMemo(
    () => GRØNNSAKER.find((g) => g.id === avstandsGrønnsakId) || GRØNNSAKER[0],
    [avstandsGrønnsakId]
  );

  const avstandsResultat = useMemo(() => {
    const len = parseFloat(bedLengde);
    const bred = parseFloat(bedBredde);
    if (!len || !bred || len <= 0 || bred <= 0) return null;
    const rader = Math.floor(bred / avstandsGrønnsak.radavstand);
    const perRad = Math.floor(len / avstandsGrønnsak.planteavstand);
    if (rader <= 0 || perRad <= 0) return null;
    return { rader, perRad, totalt: rader * perRad };
  }, [bedLengde, bedBredde, avstandsGrønnsak]);

  const getCelleType = (grønnsak, månedIndex) => {
    const m = månedIndex + 1;
    const si = forskyvRange(grønnsak.såInn, soneOffset);
    const su = forskyvRange(grønnsak.såUte, soneOffset);
    const pu = forskyvRange(grønnsak.planteUt, soneOffset);
    const ho = forskyvRange(grønnsak.høst, soneOffset);

    if (iRange(m, si)) return 'såInn';
    if (iRange(m, su)) return 'såUte';
    if (iRange(m, pu)) return 'planteUt';
    if (iRange(m, ho)) return 'høst';
    return 'tom';
  };

  return (
    <div style={stiler.side}>
      <div style={stiler.container}>

        {/* Header */}
        <div style={stiler.header}>
          <h1 style={stiler.tittel}>Plantekalender</h1>
          <p style={stiler.undertittel}>
            Guide for såing, utplanting og høsting — temperert nordeuropeisk klima (omtrentlig)
          </p>
        </div>

        {/* Innstillinger */}
        <div style={stiler.kort}>
          <div style={stiler.kortTittel}>Innstillinger</div>
          <div style={stiler.rad}>
            <span style={stiler.etikett}>Klimasone:</span>
            <select
              value={soneOffset}
              onChange={(e) => setSoneOffset(Number(e.target.value))}
              style={stiler.velg}
            >
              {SONE_VALG.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grønnsaksvalg */}
        <div style={stiler.kort}>
          <div style={stiler.kortTittel}>Velg grønnsaker</div>
          <div style={stiler.brikkeRad}>
            {GRØNNSAKER.map((grønnsak) => (
              <button
                key={grønnsak.id}
                onClick={() => byttGrønnsak(grønnsak.id)}
                style={stiler.brikke(valgteGrønnsaker.includes(grønnsak.id))}
              >
                {grønnsak.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tidslinje */}
        <div style={stiler.kort}>
          <div style={stiler.kortTittel}>Månedlig tidslinje</div>
          <div style={stiler.forklaring}>
            <div style={stiler.forklaringElement}>
              <div style={stiler.forklaringFarge('#fef9c3', '#eab308')} />
              Forkultivere / så inne
            </div>
            <div style={stiler.forklaringElement}>
              <div style={stiler.forklaringFarge('#bfdbfe', '#3b82f6')} />
              Så ute / plante ut
            </div>
            <div style={stiler.forklaringElement}>
              <div style={stiler.forklaringFarge('#bbf7d0', '#16a34a')} />
              Høste
            </div>
          </div>

          {valgteGrønnsaker_.length === 0 ? (
            <div style={stiler.ingenValg}>Velg minst én grønnsak ovenfor.</div>
          ) : (
            <div style={stiler.tidslinjePakke}>
              <div style={stiler.tidslinjeGrid}>
                {/* Headerrad */}
                <div />
                {MÅNEDER_KORT.map((m) => (
                  <div key={m} style={stiler.tidslinjeHeaderCelle}>
                    {m}
                  </div>
                ))}
                {/* Grønnsaksrader */}
                {valgteGrønnsaker_.map((grønnsak) => (
                  <React.Fragment key={grønnsak.id}>
                    <div style={stiler.tidslinjeGrønnsakEtikett} title={grønnsak.name}>
                      {grønnsak.name}
                    </div>
                    {Array.from({ length: 12 }, (_, i) => {
                      const type = getCelleType(grønnsak, i);
                      return <div key={i} style={stiler.tidslinjeCelle(type)} />;
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avstandsplanlegger */}
        <div style={stiler.kort}>
          <div style={stiler.kortTittel}>Avstandsplanlegger for bed</div>
          <div style={stiler.avstandsRad}>
            <div style={stiler.inndataGruppe}>
              <label style={stiler.etikett}>Grønnsak</label>
              <select
                value={avstandsGrønnsakId}
                onChange={(e) => setAvstandsGrønnsakId(e.target.value)}
                style={stiler.velg}
              >
                {GRØNNSAKER.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={stiler.inndataGruppe}>
              <label style={stiler.etikett}>Bedlengde (cm)</label>
              <input
                type="number"
                min="1"
                value={bedLengde}
                onChange={(e) => setBedLengde(e.target.value)}
                style={stiler.inndata}
              />
            </div>
            <div style={stiler.inndataGruppe}>
              <label style={stiler.etikett}>Bedbredde (cm)</label>
              <input
                type="number"
                min="1"
                value={bedBredde}
                onChange={(e) => setBedBredde(e.target.value)}
                style={stiler.inndata}
              />
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
            Radavstand: <strong>{avstandsGrønnsak.radavstand} cm</strong> &nbsp;|&nbsp;
            Planteavstand: <strong>{avstandsGrønnsak.planteavstand} cm</strong>
          </div>

          {avstandsResultat ? (
            <div style={stiler.resultatGrid}>
              <div style={stiler.resultatBoks}>
                <div style={stiler.resultatVerdi}>{avstandsResultat.rader}</div>
                <div style={stiler.resultatEtikett}>Rader</div>
              </div>
              <div style={stiler.resultatBoks}>
                <div style={stiler.resultatVerdi}>{avstandsResultat.perRad}</div>
                <div style={stiler.resultatEtikett}>Planter per rad</div>
              </div>
              <div style={stiler.resultatBoks}>
                <div style={stiler.resultatVerdi}>{avstandsResultat.totalt}</div>
                <div style={stiler.resultatEtikett}>Planter totalt</div>
              </div>
            </div>
          ) : (
            <div style={stiler.ingenValg}>
              Skriv inn beddimensjoner ovenfor for å se plantingsantallet.
            </div>
          )}
        </div>

        <p style={stiler.merknad}>
          Datoene er omtrentlige for et temperert klima og varierer med år, sted og sort.
          Tilpass alltid til dine lokale forhold og følg anbefalingene på frøposen.
        </p>
      </div>
    </div>
  );
}
