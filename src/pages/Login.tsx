import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CursorFollower from "../components/CursorFollower";
import { getEmailError } from "../utils/validation";
import FormValidation from "../components/common/FormValidation";
import { ROUTES } from "../constants";
import { useToast } from "../contexts/ToastContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { HOME } = ROUTES;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailError = getEmailError(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(HOME);
      } else {
        setErrors({ form: result.error || "An error occurred during login" });
      }
    } catch (error) {
      showToast("Invalid credentials. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CursorFollower />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="w-full max-w-md px-4">
          <div className="p-8 bg-gray-900/50 backdrop-blur-lg border border-indigo-500/20 shadow-2xl rounded-2xl shadow-indigo-500/10">
            <div className="mb-8 text-center">
              <div className="inline-block mb-4 transform transition-transform hover:scale-105">
                <img
                  src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                  alt="Rick"
                  className="w-24 h-24 border-4 border-green-400 rounded-full shadow-lg shadow-green-400/20"
                />
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text">
                Rick & Morty Portal
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-300">
                Enter any credentials to continue your adventure
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "", form: "" }));
                  }}
                  className={`w-full px-4 py-3 text-white bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                    errors.email
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-gray-700/50"
                  }`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <FormValidation message={errors.email} field="Email" />
                )}
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "", form: "" }));
                  }}
                  className={`w-full px-4 py-3 text-white bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                    errors.password
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-gray-700/50"
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <FormValidation message={errors.password} field="Password" />
                )}
              </div>

              {errors.form && (
                <FormValidation message={errors.form} type="error" />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"
                      role="status"
                      aria-label="Loading"
                    ></div>
                  </div>
                ) : (
                  "Open Portal"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
