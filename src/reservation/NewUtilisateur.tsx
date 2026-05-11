import { useState } from "react";
import { useReservation } from "../Context/ReservationContext";

const NewUtilisateur = ({ setUtilisateurConnecte, onBack }) => {
  const { utilisateur, setUtilisateur } = useReservation();

  const [mode, setMode] = useState("choix");

  const [selectedId, setSelectedId] = useState("");

  const [form, setForm] = useState({ name: "", email: "" });
  const [erreur, setErreur] = useState("");

  const handleConnexion = (e) => {
    e.preventDefault();
    if (!selectedId) return;
    const u = utilisateur.find((u) => u.id === parseInt(selectedId));
    if (u) setUtilisateurConnecte(u);
  };

  const handleCreation = (e) => {
    e.preventDefault();
    setErreur("");
    if (!form.name.trim() || !form.email.trim()) {
      setErreur("Nom et email obligatoires.");
      return;
    }
    if (utilisateur.find((u) => u.email === form.email.trim())) {
      setErreur("Un compte avec cet email existe déjà. Utilisez la connexion.");
      return;
    }
    const newId = utilisateur.length
      ? Math.max(...utilisateur.map((u) => u.id)) + 1
      : 1;
    const nouvel = {
      id: newId,
      name: form.name.trim(),
      email: form.email.trim(),
    };
    setUtilisateur([...utilisateur, nouvel]);
    setUtilisateurConnecte(nouvel);
  };

  return (
    <div>
      {mode === "choix" && (
        <>
          <h2>Connexion</h2>
          <div className="two-col" style={{ maxWidth: 480 }}>
            <div className="login-card" onClick={() => setMode("connexion")}>
              <span className="login-icon">🔑</span>
              J'ai déjà un compte
            </div>
            <div className="login-card" onClick={() => setMode("creation")}>
              <span className="login-icon">✨</span>
              Créer un compte
            </div>
          </div>
          <button
            className="btn"
            style={{
              marginTop: 16,
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
            }}
            onClick={onBack}
          >
            ← Retour
          </button>
        </>
      )}

      {mode === "connexion" && (
        <>
          <h2>Se connecter</h2>
          {erreur && <div className="alert alert-error">{erreur}</div>}
          {utilisateur.length === 0 ? (
            <div className="alert alert-warning">
              Aucun utilisateur enregistré. Créez un compte d'abord.
            </div>
          ) : (
            <form onSubmit={handleConnexion}>
              <div className="form-group">
                <label>Choisissez votre compte</label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  {utilisateur.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.email}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="btn btn-primary">
                  Se connecter
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                  onClick={() => setMode("choix")}
                >
                  ← Retour
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {mode === "creation" && (
        <>
          <h2>Créer un compte</h2>
          {erreur && <div className="alert alert-error">{erreur}</div>}
          <form onSubmit={handleCreation} style={{ maxWidth: 360 }}>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" className="btn btn-primary">
                Créer le compte
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onClick={() => setMode("choix")}
              >
                ← Retour
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default NewUtilisateur;
