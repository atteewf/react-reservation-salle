import { useState } from "react";
import { useReservation } from "../Context/ReservationContext";

const ReservationForm = ({ utilisateur }) => {
  const { salles, reservation, setReservation } = useReservation();

  const [salleId, setSalleId] = useState(salles[0]?.id || "");
  const [date, setDate] = useState("");
  const [creneau, setCreneau] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!salleId || !date || !creneau) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs." });
      return;
    }

    const existing = reservation.find(
      (r) => r.salleId === parseInt(salleId) && r.date === date,
    );

    const resamatin = creneau === "matin" || creneau === "les-deux";
    const resaprem = creneau === "aprem" || creneau === "les-deux";

    if (existing) {
      const conflitMatin = resamatin && !existing.resamatin;
      const conflitAprem = resaprem && !existing.resaprem;

      if (conflitMatin && conflitAprem) {
        setMessage({
          type: "error",
          text: "❌ La salle est déjà réservée pour le matin et l'après-midi ce jour-là.",
        });
        return;
      }
      if (conflitMatin) {
        setMessage({
          type: "error",
          text: "❌ La salle est déjà réservée pour le matin ce jour-là.",
        });
        return;
      }
      if (conflitAprem) {
        setMessage({
          type: "error",
          text: "❌ La salle est déjà réservée pour l'après-midi ce jour-là.",
        });
        return;
      }

      setReservation(
        reservation.map((r) =>
          r.salleId === parseInt(salleId) && r.date === date
            ? {
                ...r,
                resamatin: resamatin ? false : r.resamatin,
                resaprem: resaprem ? false : r.resaprem,
                utilisateurId: utilisateur.id,
              }
            : r,
        ),
      );
    } else {
      const newResa = {
        id: Date.now(),
        salleId: parseInt(salleId),
        utilisateurId: utilisateur.id,
        date,
        resamatin: !resamatin,
        resaprem: !resaprem,
      };
      setReservation([...reservation, newResa]);
    }

    setMessage({
      type: "success",
      text: `✅ Réservation ajoutée pour le ${date}.`,
    });
    setDate("");
    setCreneau("");
  };

  return (
    <div>
      <h2>Nouvelle réservation</h2>
      {message && (
        <div
          className={`alert alert-${message.type === "error" ? "error" : "success"}`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="two-col" style={{ maxWidth: 600 }}>
          <div className="form-group">
            <label>Salle</label>
            <select
              value={salleId}
              onChange={(e) => setSalleId(e.target.value)}
              required
            >
              <option value="">-- Choisir une salle --</option>
              {salles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Créneau</label>
            <select
              value={creneau}
              onChange={(e) => setCreneau(e.target.value)}
              required
            >
              <option value="">-- Choisir un créneau --</option>
              <option value="matin">Matin</option>
              <option value="aprem">Après-midi</option>
              <option value="les-deux">Journée entière</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 4 }}
        >
          Ajouter la réservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
