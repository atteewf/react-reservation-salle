const getSemaine = (annee, mois, jourRef) => {
  const date = new Date(annee, mois - 1, jourRef);
  const jourSemaine = (date.getDay() + 6) % 7;
  const lundi = new Date(date);
  lundi.setDate(date.getDate() - jourSemaine);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundi);
    d.setDate(lundi.getDate() + i);
    return {
      jour: d.getDate(),
      mois: d.getMonth() + 1,
      annee: d.getFullYear(),
    };
  });
};

describe("getSemaine", () => {
  test("retourne exactement 7 jours", () => {
    expect(getSemaine(2026, 3, 10)).toHaveLength(7);
  });

  test("gère correctement un changement de mois (30 mars → 5 avril)", () => {
    const semaine = getSemaine(2026, 3, 30);
    expect(semaine[0]).toEqual({ jour: 30, mois: 3, annee: 2026 });
    expect(semaine[6]).toEqual({ jour: 5, mois: 4, annee: 2026 });
  });
});
