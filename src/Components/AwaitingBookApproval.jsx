import React from "react";
import { useNavigate } from "react-router-dom";

export const AwaitingBookApproval = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/books");
  };

  return (
    <div className="container mt-4">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={goBack}>
          ← Back
        </button>
        <h4 className="mb-0">Pending Book Approvals</h4>
        <div></div> {/* Spacer for alignment */}
      </div>

      {/* Info Section */}
      <div className="alert alert-warning" role="alert">
        There are currently no books awaiting approval.
        <br />
        (When books need review, they will appear here.)
      </div>
    </div>
  );
};
