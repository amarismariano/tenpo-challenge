import React from "react";

interface FormValidationProps {
  message: string;
  type?: "error" | "warning";
  field?: string;
}

const FormValidation: React.FC<FormValidationProps> = ({
  message,
  type = "error",
  field,
}) => {
  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium animate-shake ${
        type === "error"
          ? "bg-red-500/10 text-red-500 border border-red-500/20"
          : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
      }`}
      role="alert"
    >
      {type === "error" ? (
        <svg
          className="h-5 w-5 flex-shrink-0"
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
      ) : (
        <svg
          className="h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )}
      <div className="flex-1">
        {field && (
          <span className="font-semibold">
            {field}
            {": "}
          </span>
        )}
        {message}
      </div>
    </div>
  );
};

export default FormValidation;
