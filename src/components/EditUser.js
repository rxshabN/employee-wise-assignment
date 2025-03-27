import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import apiService from "../services/api";
import AuthUtils from "../utils/auth";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    first_name: location.state?.user?.first_name || "",
    last_name: location.state?.user?.last_name || "",
    email: location.state?.user?.email || "",
  });

  useEffect(() => {
    if (!AuthUtils.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      await apiService.updateUser(id, userData);
      setSuccess("User updated successfully");
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (err) {
      setError("Failed to update user");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Edit User
          </h2>
          <p className="mt-2 text-sm text-gray-600">Update user information</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="first_name" className="sr-only">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="First Name"
                value={userData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="Last Name"
                value={userData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center bg-red-50 p-2 rounded-md border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 text-center bg-green-50 p-2 rounded-md border border-green-200">
              {success}
            </div>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
