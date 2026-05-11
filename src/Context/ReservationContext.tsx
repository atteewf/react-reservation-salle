import { createContext, useContext, useState, useEffect } from "react";

interface Salle {
  id: number;
  name: string;
}
interface Reservation {
  salleId: number;
  date: string;
  resmatin: boolean;
  resaprem: boolean;
  utilisateurId: number;
}

interface Utilisateur {
  id: number;
  name: string;
  email: string;
}

interface ReservationContextType {
  salles: Salle[];
  setSalles: (salles: Salle[]) => void;
  reservation: Reservation[];
  setReservation: (reservation: Reservation[]) => void;
  utilisateur: Utilisateur[];
  setUtilisateur: (utilisateur: Utilisateur[]) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);
export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [salles, setSalles] = useState<Salle[]>(() => {
    const saved = localStorage.getItem("salles");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Salle 1" },
          { id: 2, name: "Salle 2" },
        ];
  });

  const [reservation, setReservation] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem("reservation");
    return saved ? JSON.parse(saved) : [];
  });

  const [utilisateur, setUtilisateur] = useState<Utilisateur[]>(() => {
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
