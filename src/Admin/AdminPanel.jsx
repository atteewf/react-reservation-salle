import SupUtilisateur from "./SupUtilisateur";
import SupSalle from "./SupSalle";
import SupReservation from "./SupReservation";

const AdminPanel = () => (
  <div className="admin-sections">
    <div className="divider" />

    <div className="section-block">
      <div className="section-block-header">👥 Gestion des utilisateurs</div>
      <div className="section-block-body">
        <SupUtilisateur />
      </div>
    </div>

    <div className="section-block">
      <div className="section-block-header">🏢 Gestion des salles</div>
      <div className="section-block-body">
        <SupSalle />
      </div>
    </div>

    <div className="section-block">
      <div className="section-block-header">📅 Gestion des réservations</div>
      <div className="section-block-body">
        <SupReservation />
      </div>
    </div>
  </div>
);

export default AdminPanel;
