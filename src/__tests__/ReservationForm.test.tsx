import { render, screen, fireEvent } from "@testing-library/react";
import ReservationForm from "../reservation/ReservationForm";
import { ReservationProvider } from "../Context/ReservationContext";

const utilisateurTest = { id: 1, name: "Alice", email: "alice@test.com" };

const renderForm = () =>
  render(
    <ReservationProvider>
      <ReservationForm utilisateur={utilisateurTest} />
    </ReservationProvider>,
  );

describe("ReservationForm", () => {
  test("affiche une erreur si les champs sont vides", () => {
    renderForm();
    fireEvent.click(screen.getByText("Ajouter la réservation"));
    expect(
      screen.getByText("Veuillez remplir tous les champs."),
    ).toBeInTheDocument();
  });

  test("affiche un message de succès après une réservation valide", () => {
    renderForm();

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[1], { target: { value: "matin" } });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2026-06-15" },
    });
    fireEvent.click(screen.getByText("Ajouter la réservation"));

    expect(
      screen.getByText(/Réservation ajoutée pour le 2026-06-15/),
    ).toBeInTheDocument();
  });

  test("affiche une erreur si le matin est déjà réservé", () => {
    renderForm();

    const selects = screen.getAllByRole("combobox");
    const dateInput = screen.getByLabelText(/date/i);

    fireEvent.change(selects[1], { target: { value: "matin" } });
    fireEvent.change(dateInput, { target: { value: "2026-08-10" } });
    fireEvent.click(screen.getByText("Ajouter la réservation"));

    fireEvent.change(selects[1], { target: { value: "matin" } });
    fireEvent.change(dateInput, { target: { value: "2026-08-10" } });
    fireEvent.click(screen.getByText("Ajouter la réservation"));

    expect(
      screen.getByText(/déjà réservée pour le matin/i),
    ).toBeInTheDocument();
  });
});
