import { render, screen, fireEvent } from "@testing-library/react";
import LoginAdmin from "../Admin/LoginAdmin";

describe("LoginAdmin", () => {
  const mockSetAdminLogged = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    mockSetAdminLogged.mockClear();
    mockOnBack.mockClear();
  });

  const renderLogin = () =>
    render(
      <LoginAdmin setAdminLogged={mockSetAdminLogged} onBack={mockOnBack} />,
    );

  test("appelle setAdminLogged(true) avec les bons identifiants", () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Admin"), {
      target: { value: "Admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByText("Se connecter"));
    expect(mockSetAdminLogged).toHaveBeenCalledWith(true);
  });

  test("affiche un message d'erreur avec de mauvais identifiants", () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Admin"), {
      target: { value: "mauvais" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••"), {
      target: { value: "0000" },
    });
    fireEvent.click(screen.getByText("Se connecter"));
    expect(mockSetAdminLogged).not.toHaveBeenCalled();
    expect(
      screen.getByText("Identifiant ou mot de passe incorrect."),
    ).toBeInTheDocument();
  });
});
