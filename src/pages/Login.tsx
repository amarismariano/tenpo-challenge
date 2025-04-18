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
      <div className="min-h-screen flex items-center justify-center bg-[#1a103d]">
        <div className="w-full max-w-md">
          <div className="bg-[#0a0620] rounded-2xl shadow-xl border border-indigo-500/30 p-8">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <img
                  src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                  alt="Rick"
                  className="w-24 h-24 rounded-full border-4 border-green-400 shadow-lg"
                />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Rick & Morty Portal
              </h2>
              <p className="text-gray-100 mt-2 font-medium">
                Enter any credentials to continue your adventure
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "", form: "" }));
                  }}
                  className={`w-full px-4 py-3 bg-white rounded-lg text-gray-900 font-medium ${
                    errors.email ? "border-2 border-red-500" : ""
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
                  className={`w-full px-4 py-3 bg-white rounded-lg text-gray-900 font-medium ${
                    errors.password ? "border-2 border-red-500" : ""
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
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg transition-all hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
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
