import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import { AuthProvider } from "../../contexts/AuthContext";
import { ToastProvider } from "../../contexts/ToastContext";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock storage
vi.mock("../../utils/storage", () => ({
  default: {
    getToken: vi.fn(() => null),
    setToken: vi.fn(),
    clearAll: vi.fn(),
  },
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  it("should render login form with required fields", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open portal/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors on submit with empty fields", () => {
    renderLogin();

    const submitButton = screen.getByRole("button", { name: /open portal/i });
    fireEvent.click(submitButton);

    // Verificar que aparecen los mensajes de error
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("should clear errors when typing", () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email address");
    const submitButton = screen.getByRole("button", { name: /open portal/i });

    // Trigger error
    fireEvent.click(submitButton);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Start typing to clear error
    fireEvent.change(emailInput, { target: { value: "test" } });
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("should show validation error for short password", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /open portal/i });

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });
});
