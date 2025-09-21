import React, { useEffect } from "react";
import { useState } from "react";
import {
  getUsers,
  makeUserAdmin,
  makeUserEmployee,
  makeUserAvailable,
  makeUserUnavailable,
} from "../services/UserService";
import "../App.css";

export const BookClubUsers = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function onMakeAdmin(userId) {
    makeUserAdmin(userId)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onMakeEmployee(userId) {
    makeUserEmployee(userId)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onMakeAvailable(userId) {
    makeUserAvailable(userId)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onMakeUnavailable(userId) {
    makeUserUnavailable(userId)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Sr. No.</th>
            <th>User Name</th>
            <th className="text-center">Role</th>
            <th className="text-center">Is Available</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.userId}>
                <td className="text-center">{index + 1}</td>
                <td>{user.username}</td>
                <td className="text-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onMakeAdmin(user.userId)}
                    disabled={user.admin}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onMakeEmployee(user.userId)}
                    disabled={!user.admin}
                  >
                    Make Employee
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onMakeAvailable(user.userId)}
                    disabled={user.available}
                  >
                    Make Unavailable
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onMakeUnavailable(user.userId)}
                    disabled={!user.available}
                  >
                    Make Available
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
