import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import AuthUtils from "../utils/auth";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchUsers = useCallback(async () => {
    if (!AuthUtils.isAuthenticated()) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await apiService.getUsers(page);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setTotalPages(response.total_pages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  }, [page, navigate]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.first_name.toLowerCase().includes(lowerSearch) ||
            user.last_name.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, users]);
  const handleLogout = () => {
    AuthUtils.removeToken();
    navigate("/login");
  };
  const handleDeleteUser = async (userId) => {
    try {
      await apiService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };
  const handleEditUser = (user) => {
    navigate(`/edit-user/${user.id}`, { state: { user } });
  };
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-4 py-2 mx-1 rounded-md transition-colors duration-300 ${
            page === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 w-full rounded-lg shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full mr-6 object-cover border-4 border-indigo-100"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors duration-300"
                  aria-label="Edit User"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300"
                  aria-label="Delete User"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No users found.
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-4">
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
