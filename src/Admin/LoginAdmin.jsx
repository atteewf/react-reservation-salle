import { useState } from "react";

const LoginAdmin = ({ setAdminLogged, onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "1234") {
      setAdminLogged(true);
    } else {
      setErreur("Identifiant ou mot de passe incorrect.");
    }
  };

  return (
    <div className="card login-form">
      <h2>Connexion administrateur</h2>
      {erreur && <div className="alert alert-error">{erreur}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            placeholder="Admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            placeholder="••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button type="submit" className="btn btn-admin">
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
            onClick={onBack}
          >
            ← Retour
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
