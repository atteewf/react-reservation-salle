import { useState, useEffect } from "react";
import { useReservation } from "../Context/ReservationContext";

const MOIS = [
  { id: 1, label: "Janvier", jours: 31 },
  { id: 2, label: "Février", jours: 28 },
  { id: 3, label: "Mars", jours: 31 },
  { id: 4, label: "Avril", jours: 30 },
  { id: 5, label: "Mai", jours: 31 },
  { id: 6, label: "Juin", jours: 30 },
  { id: 7, label: "Juillet", jours: 31 },
  { id: 8, label: "Août", jours: 31 },
  { id: 9, label: "Septembre", jours: 30 },
  { id: 10, label: "Octobre", jours: 31 },
  { id: 11, label: "Novembre", jours: 30 },
  { id: 12, label: "Décembre", jours: 31 },
];

const ANNEES = [2024, 2025, 2026, 2027];
const JOURS_COURTS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const getSemaine = (annee, mois, jourRef) => {
  const date = new Date(annee, mois - 1, jourRef);
  const jourSemaine = (date.getDay() + 6) % 7;
  const lundi = new Date(date);
  lundi.setDate(date.getDate() - jourSemaine);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundi);
    d.setDate(lundi.getDate() + i);
    return {
      jour: d.getDate(),
      mois: d.getMonth() + 1,
      annee: d.getFullYear(),
    };
  });
};

const CellSlot = ({ label, libre, utilisateurNom }) => (
  <div
    className={`slot ${libre ? "libre" : "reserve"}`}
    title={
      !libre && utilisateurNom ? `Réservé par : ${utilisateurNom}` : undefined
    }
  >
    {label}
  </div>
);

const Tableau = () => {
  const { salles, reservation, utilisateur } = useReservation();
  const today = new Date();
  const isMobile = useIsMobile();

  const [mois, setMois] = useState(today.getMonth() + 1);
  const [annee, setAnnee] = useState(today.getFullYear());
  const [jourRef, setJourRef] = useState(today.getDate());

  const moisInfo = MOIS.find((m) => m.id === mois);

  const getRes = (salleId, jour, moisCible = mois, anneeCible = annee) => {
    const dateStr = `${anneeCible}-${moisCible.toString().padStart(2, "0")}-${jour.toString().padStart(2, "0")}`;
    return (
      reservation.find((r) => r.salleId === salleId && r.date === dateStr) ||
      null
    );
  };

  const getNomUtil = (utilisateurId) => {
    const u = utilisateur.find((u) => u.id === utilisateurId);
    return u ? u.name : "Inconnu";
  };

  const semaine = getSemaine(annee, mois, jourRef);

  const semainePrecedente = () => {
    const d = new Date(annee, mois - 1, jourRef);
    d.setDate(d.getDate() - 7);
    setJourRef(d.getDate());
    setMois(d.getMonth() + 1);
    setAnnee(d.getFullYear());
  };

  const semaineSuivante = () => {
    const d = new Date(annee, mois - 1, jourRef);
    d.setDate(d.getDate() + 7);
    setJourRef(d.getDate());
    setMois(d.getMonth() + 1);
    setAnnee(d.getFullYear());
  };

  const labelSemaine = () => {
    const debut = semaine[0];
    const fin = semaine[6];
    const fmtDebut = `${debut.jour} ${MOIS.find((m) => m.id === debut.mois)?.label.slice(0, 3)}`;
    const fmtFin = `${fin.jour} ${MOIS.find((m) => m.id === fin.mois)?.label.slice(0, 3)} ${fin.annee}`;
    return `${fmtDebut} – ${fmtFin}`;
  };

  const handleMoisChange = (newMois) => {
    setMois(newMois);
    setJourRef(1);
  };
  const handleAnneeChange = (newAnnee) => {
    setAnnee(newAnnee);
    setJourRef(1);
  };

  return (
    <div className="card">
      <div
        className="section-block"
        style={{ border: "none", overflow: "visible" }}
      >
        <div
          className="section-block-header"
          style={{ borderRadius: "var(--radius)", marginBottom: 16 }}
        >
          📅 Tableau des réservations
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <select
            value={mois}
            onChange={(e) => handleMoisChange(parseInt(e.target.value))}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              padding: "7px 12px",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            {MOIS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <select
            value={annee}
            onChange={(e) => handleAnneeChange(parseInt(e.target.value))}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              padding: "7px 12px",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            {ANNEES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {isMobile && (
            <div className="tableau-week-nav" style={{ flex: "1 1 100%" }}>
              <button
                className="btn btn-sm"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
                onClick={semainePrecedente}
              >
                ← Préc.
              </button>
              <span className="tableau-week-label">{labelSemaine()}</span>
              <button
                className="btn btn-sm"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
                onClick={semaineSuivante}
              >
                Suiv. →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className={isMobile ? "mobile-table" : ""}>
          <thead>
            <tr>
              <th className="col-salle">Salle</th>
              {isMobile
                ? semaine.map((d, i) => (
                    <th key={i} scope="col">
                      <div
                        style={{
                          fontSize: "0.6rem",
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 400,
                        }}
                      >
                        {JOURS_COURTS[i]}
                      </div>
                      <div>
                        {d.mois !== mois ? (
                          <span style={{ opacity: 0.5 }}>{d.jour}</span>
                        ) : (
                          d.jour
                        )}
                      </div>
                    </th>
                  ))
                : Array.from({ length: moisInfo.jours }, (_, i) => (
                    <th key={i + 1} scope="col">
                      {i + 1}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {salles.map((s) => (
              <tr key={s.id}>
                <th className="col-salle" scope="row">
                  {s.name}
                </th>
                {isMobile
                  ? semaine.map((d, i) => {
                      const res = getRes(s.id, d.jour, d.mois, d.annee);
                      const nom = res ? getNomUtil(res.utilisateurId) : null;
                      return (
                        <td
                          key={i}
                          style={d.mois !== mois ? { opacity: 0.4 } : {}}
                        >
                          <div className="cell-slots">
                            <CellSlot
                              label="M"
                              libre={res ? res.resamatin : true}
                              utilisateurNom={nom}
                            />
                            <CellSlot
                              label="A"
                              libre={res ? res.resaprem : true}
                              utilisateurNom={nom}
                            />
                          </div>
                        </td>
                      );
                    })
                  : Array.from({ length: moisInfo.jours }, (_, i) => {
                      const res = getRes(s.id, i + 1);
                      const nom = res ? getNomUtil(res.utilisateurId) : null;
                      return (
                        <td key={i + 1}>
                          <div className="cell-slots">
                            <CellSlot
                              label="M"
                              libre={res ? res.resamatin : true}
                              utilisateurNom={nom}
                            />
                            <CellSlot
                              label="A"
                              libre={res ? res.resaprem : true}
                              utilisateurNom={nom}
                            />
                          </div>
                        </td>
                      );
                    })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          gap: 16,
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          flexWrap: "wrap",
        }}
      >
        <span>
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: 2,
              background: "var(--green)",
              marginRight: 4,
            }}
          ></span>
          Libre
        </span>
        <span>
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: 2,
              background: "var(--red)",
              marginRight: 4,
            }}
          ></span>
          Réservé (survol = nom)
        </span>
        <span style={{ marginLeft: "auto", fontFamily: "DM Mono, monospace" }}>
          M = Matin · A = Après-midi
        </span>
      </div>
    </div>
  );
};

export default Tableau;
