import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApprovals, approvedToBorrow, rejectBorrowRequest, acceptReturn } from "../services/BookService";

export const AwaitingBookApproval = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  const goBack = () => navigate("/books");

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const response = await getApprovals();
      setApprovals(response.data || []);
    } catch (error) {
      console.error("Error fetching approvals:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleReturnAccept = async (approvalId) => {
    try {
      await acceptReturn(approvalId); // call backend accept return API
      fetchApprovals(); // refresh list
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  const handleApprove = async (approvalId) => {
    try {
      await approvedToBorrow(approvalId); // call backend approve API
      fetchApprovals(); // refresh list
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  const handleReject = async (approvalId) => {
    try {
      await rejectBorrowRequest(approvalId); // call backend approve API
      fetchApprovals(); // refresh list
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={goBack}>
          ← Back
        </button>
        <h4 className="mb-0">Pending Book Approvals</h4>
        <div></div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading approvals...</p>
        </div>
      ) : approvals.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          There are currently no books awaiting approval.
          <br />
          (When books need review, they will appear here.)
        </div>
      ) : (
        <table className="table table-hover shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Book Status</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.id}>
                <td>{a.bookName}</td>
                <td>{a.userName}</td>
                <td>
                  <span
                    className={`badge ${a.status === "PENDING"
                      ? "bg-warning text-dark"
                      : a.status === "APPROVED"
                        ? "bg-success"
                        : "bg-secondary"
                      }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td>{a.userType}</td>
                <td>
                  {a.status === "BORROW_PENDING" && a.userType === "ADMIN" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleApprove(a.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleReject(a.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                  {a.status === "RETURN_PENDING" && a.userType === "ADMIN" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleReturnAccept(a.id)}
                      >
                        Accept Return
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
