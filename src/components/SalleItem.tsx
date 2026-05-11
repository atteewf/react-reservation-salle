import { useReservation } from "../Context/ReservationContext";
interface ReservationProps {
  id: number;
  salleId: number;
  date: string;
  resamatin: boolean;
  resaprem: boolean;
  utilisateurId: number;
}

const SalleItem = ({
  id,
  salleId,
  date,
  resamatin,
  resaprem,
  utilisateurId,
}: ReservationProps) => {
  const { salles, utilisateur } = useReservation();
  const salleCorrespondante = salles.find((s) => s.id === salleId);
  const utilisateurCorrespondant = utilisateur?.find(
    (u) => u.id === utilisateurId,
  );

  return (
    <div style={{ padding: "5px", borderBottom: "1px solid #ccc" }}>
      <div>Nom de la salle : {salleCorrespondante?.name}</div>
      <div>Date de la réservation : {date}</div>
      <div>Réservation du matin : {resamatin ? "libre" : "réservé"}</div>
      <div>Réservation de l'après-midi : {resaprem ? "libre" : "réservé"}</div>
      <div>
        Nom de l'utilisateur : {utilisateurCorrespondant?.name || "Non défini"}
      </div>
    </div>
  );
};

export default SalleItem;
