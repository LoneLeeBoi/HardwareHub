export default function SettingsSection() {
  return (
    <div className="">
      <div className="w-full  bg-white border border-gray-200 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
        <div className="space-y-3">
          <div className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200">
            Change Password
          </div>
          <div className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200">
            Change Profile Info
          </div>
        </div>
      </div>
    </div>
  );
}
