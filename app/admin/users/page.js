"use client";

import {
  DeleteUser,
  UserFunctions,
} from "@/app/components/functions/UsersFunctions";
import AddUserModal from "@/app/popups/addUserModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import Pagination from "@/app/utils/Pagination";
import { Edit } from "@/public/icons/edit";
import { Magnify } from "@/public/icons/magnify";
import { Trash } from "@/public/icons/trash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Modals & Editing
  const [isOpen, setOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    contact: "",
  });

  const getStatus = (user) => (user.isActive ? "Active" : "Inactive");

  const filteredUsers = users.filter((user) => {
    const status = getStatus(user);
    const matchesSearch = ["username", "email", "firstname", "lastname"].some(
      (key) => (user[key]?.toLowerCase() || "").includes(search.toLowerCase())
    );
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const handleDelete = async (id) => {
    try {
      const success = await DeleteUser(id);
      if (success) {
        toast.success("User data deleted.");
        fetchUsers();
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await UserFunctions({ page, limit });
      if (result.success) {
        setUsers(result.data.data || []);
        setTotalPages(result.data.totalPages || 1);
      } else {
        console.error("Fetch failed:", result.err);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 uppercase">
        User Management
      </h1>
      <div className="border border-gray-200 rounded p-4">
        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mb-3 flex items-center border border-gray-300 rounded-lg px-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        >
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-transparent border-none outline-none ring-0 focus:!outline-none focus:!ring-0"
          />
          <Magnify className="h-7 w-7 text-gray-500 ml-2" />
        </form>

        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                {[
                  "Username",
                  "Email",
                  "First Name",
                  "Last Name",
                  "Contact",
                  "Address",
                  "Actions",
                ].map((head) => (
                  <th key={head} className="p-2 border-b">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="p-2">{user.username || "-"}</td>
                    <td className="p-2">{user.email || "-"}</td>
                    <td className="p-2">{user.firstname || "-"}</td>
                    <td className="p-2">{user.lastname || "-"}</td>
                    <td className="p-2">{user.contact || "-"}</td>
                    <td className="p-2">{user.address || "-"}</td>
                    <td className="p-2 flex space-x-2">
                      <div
                        onClick={() => {
                          setUserData(user);
                          setOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Edit className="size-6 text-blue-600" />
                      </div>
                      <div
                        onClick={() => {
                          setDeleteId(user.user_id);
                          setIsConfirm(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash className="size-6 text-red-600" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-2">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                key={user.user_id}
                className="border rounded-lg p-3 shadow-sm bg-white"
              >
                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {user.username || "-"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email || "-"}
                </p>
                <p>
                  <span className="font-semibold">First Name:</span>{" "}
                  {user.firstname || "-"}
                </p>
                <p>
                  <span className="font-semibold">Last Name:</span>{" "}
                  {user.lastname || "-"}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {user.contact || "-"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {user.address || "-"}
                </p>

                {/* Actions */}
                <div className="flex space-x-3 mt-2">
                  <div
                    onClick={() => {
                      setUserData(user);
                      setOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Edit className="size-6 text-blue-600" />
                  </div>
                  <div
                    onClick={() => {
                      setDeleteId(user.user_id);
                      setIsConfirm(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Trash className="size-6 text-red-600" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No results found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={totalPages}
          />
        </div>

        {/* Delete Confirmation */}
        <ConfirmationModal
          isOpen={isConfirm}
          onClose={() => setIsConfirm(false)}
          onConfirm={() => {
            if (deleteId) {
              handleDelete(deleteId);
              setDeleteId(null);
            }
            setIsConfirm(false);
          }}
          title="Are you sure?"
          message="This action cannot be undone."
        />

        {/* Edit/Add User Modal */}
        <AddUserModal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          newUser={userData}
          setNewUser={setUserData}
          refreshUsers={fetchUsers}
          isEditing={true}
        />
      </div>
    </div>
  );
}
