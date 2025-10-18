import React, { useEffect, useState } from "react";
import {
  getUsers,
  makeUserAdmin,
  makeUserEmployee,
  makeUserAvailable,
  makeUserUnavailable,
} from "../services/UserService";

export const BookClubUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleRoleChange = (userId, toAdmin) => {
    const action = toAdmin ? makeUserAdmin : makeUserEmployee;
    action(userId)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  const handleAvailabilityChange = (userId, toAvailable) => {
    const action = toAvailable ? makeUserAvailable : makeUserUnavailable;
    action(userId)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📋 Book Club Users</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Availability</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.userId}>
                  <td className="text-center">{index + 1}</td>
                  <td>{user.username}</td>
                  <td className="text-center">
                    <span className={`badge ${user.admin ? "bg-success" : "bg-secondary"}`}>
                      {user.admin ? "Admin" : "Employee"}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${user.available ? "bg-success" : "bg-danger"}`}>
                      {user.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleRoleChange(user.userId, !user.admin)}
                      >
                        {user.admin ? "Make Employee" : "Make Admin"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleAvailabilityChange(user.userId, !user.available)}
                      >
                        {user.available ? "Make Unavailable" : "Make Available"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
