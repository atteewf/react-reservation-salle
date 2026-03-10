import { createContext, useContext, useState, useEffect } from "react";

const ReservationContext = createContext();
export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [salles, setSalles] = useState(() => {
    const saved = localStorage.getItem("salles");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Salle 1" },
          { id: 2, name: "Salle 2" },
        ];
  });

  const [reservation, setReservation] = useState(() => {
    const saved = localStorage.getItem("reservation");
    return saved ? JSON.parse(saved) : [];
  });

  const [utilisateur, setUtilisateur] = useState(() => {
    const saved = localStorage.getItem("utilisateur");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(
    () => localStorage.setItem("salles", JSON.stringify(salles)),
    [salles],
  );
  useEffect(
    () => localStorage.setItem("reservation", JSON.stringify(reservation)),
    [reservation],
  );
  useEffect(
    () => localStorage.setItem("utilisateur", JSON.stringify(utilisateur)),
    [utilisateur],
  );

  return (
    <ReservationContext.Provider
      value={{
        salles,
        setSalles,
        reservation,
        setReservation,
        utilisateur,
        setUtilisateur,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
