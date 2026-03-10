import { useState } from "react";
import { useReservation } from "../Context/ReservationContext";

const SupSalle = () => {
  const { salles, setSalles, reservation, setReservation } = useReservation();
  const [form, setForm] = useState({ id: "", name: "" });
  const [message, setMessage] = useState(null);

  const reset = () => setForm({ id: "", name: "" });

  const handleSelect = (e) => {
    const s = salles.find((s) => s.id === parseInt(e.target.value));
    setForm(s ? { id: s.id, name: s.name } : { id: "", name: "" });
    setMessage(null);
  };

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage({ type: "error", text: "Nom requis." });
      return;
    }
    if (
      salles.find(
        (s) => s.name.trim().toLowerCase() === form.name.trim().toLowerCase(),
      )
    ) {
      setMessage({ type: "error", text: "Une salle avec ce nom existe déjà." });
      return;
    }
    const newId = salles.length ? Math.max(...salles.map((s) => s.id)) + 1 : 1;
    setSalles([...salles, { id: newId, name: form.name.trim() }]);
    setMessage({ type: "success", text: "Salle ajoutée." });
    reset();
  };

  const handleModifier = (e) => {
    e.preventDefault();
    if (!form.id) {
      setMessage({ type: "error", text: "Sélectionnez une salle." });
      return;
    }
    setSalles(
      salles.map((s) =>
        s.id === parseInt(form.id) ? { ...s, name: form.name.trim() } : s,
      ),
    );
    setMessage({ type: "success", text: "Salle modifiée." });
    reset();
  };

  const handleSupprimer = (e) => {
    e.preventDefault();
    if (!form.id) {
      setMessage({ type: "error", text: "Sélectionnez une salle." });
      return;
    }
    setSalles(salles.filter((s) => s.id !== parseInt(form.id)));
    setReservation(reservation.filter((r) => r.salleId !== parseInt(form.id)));
    setMessage({
      type: "success",
      text: "Salle supprimée (et ses réservations).",
    });
    reset();
  };

  return (
    <div style={{ width: "100%" }}>
      {message && (
        <div
          className={`alert alert-${message.type === "error" ? "error" : "success"}`}
        >
          {message.text}
        </div>
      )}
      <div className="two-col" style={{ maxWidth: 500 }}>
        <div className="form-group">
          <label>Salle existante</label>
          <select value={form.id} onChange={handleSelect}>
            <option value="">-- Nouvelle ou sélectionner --</option>
            {salles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nom de la salle</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom de la salle"
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn btn-primary btn-sm" onClick={handleAjouter}>
          + Ajouter
        </button>
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
        <button className="btn btn-danger btn-sm" onClick={handleSupprimer}>
          🗑 Supprimer
        </button>
      </div>
    </div>
  );
};

export default SupSalle;
