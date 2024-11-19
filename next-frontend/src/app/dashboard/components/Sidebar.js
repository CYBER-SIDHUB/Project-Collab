export default function Sidebar({ setActiveTab }) {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <h1 className="text-2xl font-bold p-4">Dashboard</h1>
            <button
                className="p-4 hover:bg-gray-700"
                onClick={() => setActiveTab("projectBoard")}
            >
                Project Board
            </button>
            <button
                className="p-4 hover:bg-gray-700"
                onClick={() => setActiveTab("chatRoom")}
            >
                Chat Room
            </button>
            <button
                className="p-4 hover:bg-gray-700"
                onClick={() => setActiveTab("whiteboard")}
            >
                Whiteboard
            </button>
        </div>
    );
}
