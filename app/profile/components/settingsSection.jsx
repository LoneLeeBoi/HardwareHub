export default function SettingsSection() {
    return (
      <div className="">
        <div className="w-full md:w-64 border rounded shadow-sm p-4">
          <h2 className="font-semibold text-lg mb-4">Settings</h2>
          <div className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2">
            Change Password
          </div>
          <div className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Change Profile Info
          </div>
        </div>
      </div>
    );
  }