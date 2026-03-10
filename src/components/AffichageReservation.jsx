import { useReservation } from "../Context/ReservationContext";

const AffichageReservation = ({ salleId, jour, mois, annee }) => {
  const { reservation } = useReservation();
  const dateStr = `${annee}-${mois.toString().padStart(2, "0")}-${jour.toString().padStart(2, "0")}`;
  const res = reservation.find(
    (r) => r.salleId === salleId && r.date === dateStr,
  );
  if (!res) return <>-</>;
  return (
    <>
      {res.resamatin ? (
        <span style={{ color: "green" }}>M</span>
      ) : (
        <span style={{ color: "red" }}>M</span>
      )}
      {res.resaprem ? (
        <span style={{ color: "green" }}>A</span>
      ) : (
        <span style={{ color: "red" }}>A</span>
      )}
    </>
  );
};
export default AffichageReservation;
