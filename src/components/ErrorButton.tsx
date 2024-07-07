import React from "react";

const ErrorButton: React.FC = () => {
  return (
    <button
      onClick={() => {
        throw new Error("Test Error");
      }}
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
