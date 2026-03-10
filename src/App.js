import "./styles/App.css";
import { useState } from "react";
import { ReservationProvider } from "./Context/ReservationContext";

import LoginAdmin from "./Admin/LoginAdmin";
import AdminPanel from "./Admin/AdminPanel";
import NewUtilisateur from "./reservation/NewUtilisateur";
import ReservationForm from "./reservation/ReservationForm";
import Tableau from "./components/Tableau";

function App() {
  const [userType, setUserType] = useState(null); // "admin" | "user"
  const [adminLogged, setAdminLogged] = useState(false);
  const [utilisateurConnecte, setUtilisateurConnecte] = useState(null); // objet {id, name, email}

  const handleLogout = () => {
    setUserType(null);
    setAdminLogged(false);
    setUtilisateurConnecte(null);
  };

  return (
    <ReservationProvider>
      <div className="app-layout">
        {!userType && (
          <div className="login-screen">
            <h2>Réservation de salles</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Choisissez votre profil pour continuer
            </p>
            <div className="login-choices">
              <div className="login-card" onClick={() => setUserType("admin")}>
                <span className="login-icon">🔐</span>
                Administrateur
              </div>
              <div className="login-card" onClick={() => setUserType("user")}>
                <span className="login-icon">👤</span>
                Utilisateur
              </div>
            </div>
          </div>
        )}
        {userType === "admin" && !adminLogged && (
          <LoginAdmin setAdminLogged={setAdminLogged} onBack={handleLogout} />
        )}
        {userType === "admin" && adminLogged && (
          <div className="card">
            <div className="app-header">
              <h1>Réservation de salles</h1>
              <span className="badge-role admin">Administrateur</span>
              <button
                className="btn btn-sm"
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
            <AdminPanel />
          </div>
        )}
        {userType === "user" && (
          <div className="card">
            <div className="app-header">
              <h1>Réservation de salles</h1>
              {utilisateurConnecte && (
                <>
                  <span className="badge-role user">Utilisateur</span>
                  <div className="user-info-bar" style={{ marginLeft: "auto" }}>
                    <strong>{utilisateurConnecte.name}</strong>
                    <span
                      style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                    >
                      {utilisateurConnecte.email}
                    </span>
                    <button className="logout-btn" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>

            {!utilisateurConnecte ? (
              <NewUtilisateur
                setUtilisateurConnecte={setUtilisateurConnecte}
                onBack={handleLogout}
              />
            ) : (
              <ReservationForm utilisateur={utilisateurConnecte} />
            )}
          </div>
        )}
        <Tableau userType={userType} />
      </div>
    </ReservationProvider>
  );
}

export default App;
