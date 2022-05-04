import "./LoadingSpinner.css";

import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner__overlay">
      <div className="lds-dual-ring"></div>
    </div>
  );
};
