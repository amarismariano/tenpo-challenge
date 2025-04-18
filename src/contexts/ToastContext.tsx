import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type, isVisible: true });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.isVisible && (
        <div
          className={`fixed z-50 transform transition-all duration-500 animate-fade-in-up
            top-4 left-4 right-4 mx-auto
            sm:left-auto sm:right-4 sm:max-w-sm
            md:top-6 md:max-w-md
            px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm
            ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500/90 to-green-600/90 text-white shadow-green-500/50"
                : "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white shadow-red-500/50"
            }`}
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex items-center space-x-3">
            {toast.type === "success" ? (
              <svg
                className="flex-shrink-0 w-5 h-5 animate-bounce sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="flex-shrink-0 w-5 h-5 animate-pulse sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="flex-1 text-sm font-medium sm:text-base">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
