import { useState } from "react";
import { useReservation } from "../Context/ReservationContext";

const SupReservation = () => {
  const { salles, utilisateur, reservation, setReservation } = useReservation();

  const [filterSalle, setFilterSalle] = useState("");
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    id: "",
    salleId: salles[0]?.id || "",
    utilisateurId: utilisateur[0]?.id || "",
    date: "",
    resamatin: true,
    resaprem: true,
  });

  const reset = () => {
    setForm({
      id: "",
      salleId: salles[0]?.id || "",
      utilisateurId: utilisateur[0]?.id || "",
      date: "",
      resamatin: true,
      resaprem: true,
    });
    setMessage(null);
  };

  const handleSelectResa = (e) => {
    const r = reservation.find((r) => r.id === parseInt(e.target.value));
    if (!r) {
      reset();
      return;
    }
    setForm({ ...r });
    setMessage(null);
  };

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!form.salleId || !form.date) {
      setMessage({ type: "error", text: "Salle et date requises." });
      return;
    }
    const existing = reservation.find(
      (r) =>
        r.salleId === parseInt(form.salleId) &&
        r.date === form.date &&
        r.id !== parseInt(form.id),
    );
    if (existing) {
      setMessage({
        type: "error",
        text: "Une réservation existe déjà pour cette salle et cette date.",
      });
      return;
    }
    const newResa = {
      id: Date.now(),
      salleId: parseInt(form.salleId),
      utilisateurId: parseInt(form.utilisateurId),
      date: form.date,
      resamatin: form.resamatin,
      resaprem: form.resaprem,
    };
    setReservation([...reservation, newResa]);
    setMessage({ type: "success", text: "Réservation ajoutée." });
    reset();
  };

  const handleModifier = (e) => {
    e.preventDefault();
    if (!form.id) {
      setMessage({ type: "error", text: "Sélectionnez une réservation." });
      return;
    }
    setReservation(
      reservation.map((r) =>
        r.id === parseInt(form.id)
          ? {
              ...r,
              salleId: parseInt(form.salleId),
              utilisateurId: parseInt(form.utilisateurId),
              date: form.date,
              resamatin: form.resamatin,
              resaprem: form.resaprem,
            }
          : r,
      ),
    );
    setMessage({ type: "success", text: "Réservation modifiée." });
    reset();
  };

  const handleSupprimer = (id) => {
    setReservation(reservation.filter((r) => r.id !== id));
    setMessage({ type: "success", text: "Réservation supprimée." });
  };

  const getSalleName = (id) => salles.find((s) => s.id === id)?.name || "?";
  const getUserName = (id) => utilisateur.find((u) => u.id === id)?.name || "?";

  const filtered = filterSalle
    ? reservation.filter((r) => r.salleId === parseInt(filterSalle))
    : reservation;

  return (
    <div style={{ width: "100%" }}>
      {message && (
        <div
          className={`alert alert-${message.type === "error" ? "error" : "success"}`}
        >
          {message.text}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <h3
          style={{
            marginBottom: 12,
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {form.id
            ? "Modifier la réservation sélectionnée"
            : "Ajouter une réservation"}
        </h3>
        <div className="two-col" style={{ maxWidth: 680 }}>
          <div className="form-group">
            <label>Salle</label>
            <select
              value={form.salleId}
              onChange={(e) => setForm({ ...form, salleId: e.target.value })}
            >
              {salles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Utilisateur</label>
            <select
              value={form.utilisateurId}
              onChange={(e) =>
                setForm({ ...form, utilisateurId: e.target.value })
              }
            >
              {utilisateur.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Créneaux</label>
            <div style={{ display: "flex", gap: 14, paddingTop: 6 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textTransform: "none",
                  letterSpacing: 0,
                  color: "var(--text)",
                }}
              >
                <input
                  type="checkbox"
                  checked={!form.resamatin}
                  onChange={(e) =>
                    setForm({ ...form, resamatin: !e.target.checked })
                  }
                />
                Matin réservé
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textTransform: "none",
                  letterSpacing: 0,
                  color: "var(--text)",
                }}
              >
                <input
                  type="checkbox"
                  checked={!form.resaprem}
                  onChange={(e) =>
                    setForm({ ...form, resaprem: !e.target.checked })
                  }
                />
                Après-midi réservé
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-primary btn-sm" onClick={handleAjouter}>
            + Ajouter
          </button>
          {form.id && (
            <>
              <button
                className="btn btn-sm"
                style={{
                  background: "var(--admin-light)",
                  color: "var(--admin)",
                  border: "1px solid #c5ccdf",
                }}
                onClick={handleModifier}
              >
                ✏️ Modifier
              </button>
              <button
                className="btn btn-sm"
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onClick={reset}
              >
                Annuler
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
            }}
          >
            Réservations existantes
          </span>
          <select
            value={filterSalle}
            onChange={(e) => setFilterSalle(e.target.value)}
            style={{
              fontSize: "0.8rem",
              padding: "4px 8px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-2)",
            }}
          >
            <option value="">Toutes les salles</option>
            {salles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div
            className="alert"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            Aucune réservation.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filtered
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 12px",
                    background: "var(--surface-2)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    fontSize: "0.83rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: 90 }}>
                    {r.date}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {getSalleName(r.salleId)}
                  </span>
                  <span>👤 {getUserName(r.utilisateurId)}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <span
                      className={`slot ${r.resamatin ? "libre" : "reserve"}`}
                      style={{ fontSize: "0.7rem", padding: "1px 7px" }}
                    >
                      M
                    </span>
                    <span
                      className={`slot ${r.resaprem ? "libre" : "reserve"}`}
                      style={{ fontSize: "0.7rem", padding: "1px 7px" }}
                    >
                      A
                    </span>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: "var(--admin-light)",
                        color: "var(--admin)",
                        border: "1px solid #c5ccdf",
                        padding: "4px 10px",
                        fontSize: "0.75rem",
                      }}
                      onClick={() => setForm({ ...r })}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                      onClick={() => handleSupprimer(r.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupReservation;
