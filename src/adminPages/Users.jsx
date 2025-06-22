import React, { useEffect, useState } from "react";
import "../styles/AdminUsers.css"; // Create this file for custom styles
import instance from "../axiosInstance/Instance";
// Dummy data for demonstration

const Users = ({yourId}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("/api/auth/users");
        console.log("Users fetched successfully:", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    if (userId === yourId) {
      alert("You cannot delete yourself!");
      return;
    }
    try {
      const response = await instance.delete(`/api/auth/${userId}`);
      console.log("Users Deleted successfully:", response.data);
      // Optionally, you can refetch users after deletion
      const responseUser = await instance.get("/api/auth/users");
      console.log("Users fetched after deletion:", responseUser.data.users);
      setUsers(responseUser.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="admin-users-page">
      <h1 className="admin-title">User Management</h1>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
