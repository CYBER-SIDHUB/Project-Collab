"use client";

// import AuthGuard from "@/utils/AuthGuard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProjectBoard from "./components/ProjectBoard";
import ChatRoom from "./components/ChatRoom";
import Whiteboard from "./components/Whiteboard";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("projectBoard"); // Tracks the current active feature

    const renderContent = () => {
        switch (activeTab) {
            case "projectBoard":
                return <ProjectBoard />;
            case "chatRoom":
                return <ChatRoom />;
            case "whiteboard":
                return <Whiteboard />;
            default:
                return <ProjectBoard />;
        }
    };

    return (
        // <AuthGuard>
            <div className="flex h-screen">
                <Sidebar setActiveTab={setActiveTab} />
                <div className="flex flex-col flex-grow">
                    <Navbar />
                    <div className="flex-grow p-4">{renderContent()}</div>
                </div>
            </div>
        // </AuthGuard>
    );
}
