import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
          onClick={() => onEdit(user)}
          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors duration-300"
          aria-label="Edit User"
        >
          <PencilIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300"
          aria-label="Delete User"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
