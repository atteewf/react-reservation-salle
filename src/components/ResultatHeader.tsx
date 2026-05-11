interface ResHeader {
  tab_mois: { id: number; label: string; jours: number }[];
  mois: number;
}

const ResultatHeader = ({ tab_mois, mois }: ResHeader) => {
  const moisSelectionne = tab_mois.find((m) => m.id === mois);
  if (!moisSelectionne) return null;
  return (
    <>
      {Array.from({ length: moisSelectionne.jours }, (_, i) => (
        <th key={i}>{i + 1}</th>
      ))}
    </>
  );
};
export default ResultatHeader;
