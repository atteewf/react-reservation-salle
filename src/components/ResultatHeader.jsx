const ResultatHeader = ({ tab_mois, mois }) => {
  const moisSelectionne = tab_mois.find((m) => m.id === parseInt(mois));
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
