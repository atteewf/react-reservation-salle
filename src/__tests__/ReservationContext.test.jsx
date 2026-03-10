import { render, act } from "@testing-library/react";
import {
  ReservationProvider,
  useReservation,
} from "../Context/ReservationContext";

const TestConsumer = ({ onRender }) => {
  const ctx = useReservation();
  onRender(ctx);
  return null;
};

const renderWithContext = (onRender) =>
  render(
    <ReservationProvider>
      <TestConsumer onRender={onRender} />
    </ReservationProvider>,
  );

describe("ReservationContext", () => {
  test("ajoute une réservation dans la liste", () => {
    let ctx;
    renderWithContext((c) => {
      ctx = c;
    });

    act(() => {
      ctx.setReservation([
        {
          id: 1,
          salleId: 1,
          utilisateurId: 1,
          date: "2026-04-15",
          resamatin: false,
          resaprem: true,
        },
      ]);
    });

    expect(ctx.reservation).toHaveLength(1);
    expect(ctx.reservation[0].date).toBe("2026-04-15");
  });

  test("supprimer une salle retire aussi ses réservations", () => {
    let ctx;
    renderWithContext((c) => {
      ctx = c;
    });

    act(() => {
      ctx.setReservation([
        {
          id: 1,
          salleId: 1,
          utilisateurId: 1,
          date: "2026-04-15",
          resamatin: false,
          resaprem: true,
        },
        {
          id: 2,
          salleId: 2,
          utilisateurId: 1,
          date: "2026-04-15",
          resamatin: true,
          resaprem: false,
        },
      ]);
    });

    act(() => {
      ctx.setSalles(ctx.salles.filter((s) => s.id !== 1));
      ctx.setReservation(ctx.reservation.filter((r) => r.salleId !== 1));
    });

    expect(ctx.salles.find((s) => s.id === 1)).toBeUndefined();
    expect(ctx.reservation).toHaveLength(1);
  });

  test("modifier un créneau met à jour la réservation", () => {
    let ctx;
    renderWithContext((c) => {
      ctx = c;
    });

    act(() => {
      ctx.setReservation([
        {
          id: 5,
          salleId: 1,
          utilisateurId: 1,
          date: "2026-06-10",
          resamatin: true,
          resaprem: true,
        },
      ]);
    });

    act(() => {
      ctx.setReservation(
        ctx.reservation.map((r) =>
          r.id === 5 ? { ...r, resamatin: false } : r,
        ),
      );
    });

    const updated = ctx.reservation.find((r) => r.id === 5);
    expect(updated.resamatin).toBe(false);
    expect(updated.resaprem).toBe(true);
  });
});
