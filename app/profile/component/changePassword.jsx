import {
  ChangeUserPassword,
  PasswordValidation,
} from "@/app/components/functions/UsersFunctions";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [currentPasswordValid, setCurrentPasswordValid] = useState(null); // null = untouched
  const [passwordMatchValid, setPasswordMatchValid] = useState(null); // null = untouched
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await ChangeUserPassword(newPassword);

      if (res) {
        toast.success("Password updated successfully");
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating password");
    }

    // Reset form state
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPasswordError("");
    setCurrentPasswordValid(null);
    setPasswordMatchValid(null);
    setPasswordMatchError("");
  };

  const handleCurrentPasswordChange = async (value) => {
    setCurrentPassword(value);

    if (!value) {
      setCurrentPasswordValid(null);
      setCurrentPasswordError("");
      return;
    }

    try {
      const isValid = await PasswordValidation(value);
      setCurrentPasswordValid(isValid);
      setCurrentPasswordError(isValid ? "" : "Current password is incorrect.");
    } catch (error) {
      console.error("Validation error:", error);
      setCurrentPasswordValid(false);
      setCurrentPasswordError("Error validating password.");
    }
  };

  const handleNewPasswordChange = (value, confirmValue) => {
    setNewPassword(value);
    checkPasswordMatch(value, confirmValue);
  };

  const handleConfirmPasswordChange = (value, newValue) => {
    setConfirmPassword(value);
    checkPasswordMatch(newValue, value);
  };

  const checkPasswordMatch = (pwd, confirm) => {
    if (!pwd && !confirm) {
      setPasswordMatchValid(null);
      setPasswordMatchError("");
      return;
    }
    if (pwd === confirm) {
      setPasswordMatchValid(true);
      setPasswordMatchError("");
    } else {
      setPasswordMatchValid(false);
      setPasswordMatchError("Passwords do not match.");
    }
  };

  return (
    <div className="flex justify-center w-full sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              className={`w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 ${
                currentPasswordValid === null
                  ? "border-gray-300 focus:ring-blue-500"
                  : currentPasswordValid
                  ? "border-green-500 focus:ring-green-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              value={currentPassword}
              onChange={(e) => handleCurrentPasswordChange(e.target.value)}
              required
            />
            {currentPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                {currentPasswordError}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className={`w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 ${
                passwordMatchValid === null
                  ? "border-gray-300 focus:ring-blue-500"
                  : passwordMatchValid
                  ? "border-green-500 focus:ring-green-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              value={newPassword}
              onChange={(e) =>
                handleNewPasswordChange(e.target.value, confirmPassword)
              }
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 ${
                passwordMatchValid === null
                  ? "border-gray-300 focus:ring-blue-500"
                  : passwordMatchValid
                  ? "border-green-500 focus:ring-green-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              value={confirmPassword}
              onChange={(e) =>
                handleConfirmPasswordChange(e.target.value, newPassword)
              }
              required
            />
            {passwordMatchError && (
              <p className="text-red-500 text-xs mt-1">
                {passwordMatchError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!currentPasswordValid || !passwordMatchValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
