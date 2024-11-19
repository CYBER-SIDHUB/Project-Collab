export default function Navbar() {
    return (
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl">Welcome to Your Dashboard</h2>
            <button
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                    // Logout logic
                    window.localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
            >
                Logout
            </button>
        </div>
    );
}
