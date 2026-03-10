import { useState } from "react";
import { useReservation } from "../Context/ReservationContext";

const SupUtilisateur = () => {
  const { utilisateur, setUtilisateur } = useReservation();

  const [form, setForm] = useState({ id: "", name: "", email: "" });
  const [message, setMessage] = useState(null);

  const reset = () => setForm({ id: "", name: "", email: "" });

  const handleSelect = (e) => {
    const u = utilisateur.find((u) => u.id === parseInt(e.target.value));
    setForm(
      u
        ? { id: u.id, name: u.name, email: u.email }
        : { id: "", name: "", email: "" },
    );
    setMessage(null);
  };

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setMessage({ type: "error", text: "Nom et email requis." });
      return;
    }
    if (utilisateur.find((u) => u.email === form.email.trim())) {
      setMessage({ type: "error", text: "Email déjà utilisé." });
      return;
    }
    const newId = utilisateur.length
      ? Math.max(...utilisateur.map((u) => u.id)) + 1
      : 1;
    setUtilisateur([
      ...utilisateur,
      { id: newId, name: form.name.trim(), email: form.email.trim() },
    ]);
    setMessage({ type: "success", text: "Utilisateur ajouté." });
    reset();
  };

  const handleModifier = (e) => {
    e.preventDefault();
    if (!form.id) {
      setMessage({ type: "error", text: "Sélectionnez un utilisateur." });
      return;
    }
    setUtilisateur(
      utilisateur.map((u) =>
        u.id === parseInt(form.id)
          ? { ...u, name: form.name.trim(), email: form.email.trim() }
          : u,
      ),
    );
    setMessage({ type: "success", text: "Utilisateur modifié." });
    reset();
  };

  const handleSupprimer = (e) => {
    e.preventDefault();
    if (!form.id) {
      setMessage({ type: "error", text: "Sélectionnez un utilisateur." });
      return;
    }
    setUtilisateur(utilisateur.filter((u) => u.id !== parseInt(form.id)));
    setMessage({ type: "success", text: "Utilisateur supprimé." });
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
      <div className="two-col" style={{ maxWidth: 680 }}>
        <div className="form-group">
          <label>Utilisateur existant</label>
          <select value={form.id} onChange={handleSelect}>
            <option value="">-- Nouveau ou sélectionner --</option>
            {utilisateur.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} — {u.email}
              </option>
            ))}
          </select>
        </div>
        <div></div>
        <div className="form-group">
          <label>Nom</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@exemple.com"
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

export default SupUtilisateur;
