import { useReservation } from "../Context/ReservationContext";

const SalleItem = ({ reservation }) => {
  const { salles, utilisateur } = useReservation();
  const salleCorrespondante = salles.find((s) => s.id === reservation.salleId);
  const utilisateurCorrespondant = utilisateur?.find(
    (u) => u.id === reservation.utilisateurId,
  );

  return (
    <div style={{ padding: "5px", borderBottom: "1px solid #ccc" }}>
      <div>Nom de la salle : {salleCorrespondante?.name}</div>
      <div>Date de la réservation : {reservation.date}</div>
      <div>
        Réservation du matin : {reservation.resamatin ? "libre" : "réservé"}
      </div>
      <div>
        Réservation de l'après-midi :{" "}
        {reservation.resaprem ? "libre" : "réservé"}
      </div>
      <div>
        Nom de l'utilisateur : {utilisateurCorrespondant?.name || "Non défini"}
      </div>
    </div>
  );
};

export default SalleItem;
