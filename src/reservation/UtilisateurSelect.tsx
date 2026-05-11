interface Utilisateur {
  id: number;
  name: string;
}

interface UtilisateurSelectProps {
  utilisateur: Utilisateur[];
  value: string;
  onChange: (value: string) => void;
}

const UtilisateurSelect = ({
  utilisateur,
  value,
  onChange,
}: UtilisateurSelectProps) => {
  return (
    <div>
      <label htmlFor="utilisateur_select">Utilisateur :</label>
      <select
        name="utilisateur_select"
        id="utilisateur_select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          --Bonjour veuillez selectionner votre identité--
        </option>
        {utilisateur.map((ut) => (
          <option key={ut.id} value={ut.id}>
            {ut.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UtilisateurSelect;
