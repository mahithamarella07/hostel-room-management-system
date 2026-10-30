
import React from "react";
import { LayoutDashboard, DoorOpen, Building2 } from "lucide-react";

function Sidebar({ page, setPage }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <Building2 size={28} />
                <h2>Haven</h2>
            </div>

            <p className="menu-label">MENU</p>

            <button
                className={`nav-item ${page === "home" ? "active" : ""}`}
                onClick={() => setPage("home")}
            >
                <LayoutDashboard size={19} />
                <span>Overview</span>
            </button>

            <button
                className={`nav-item ${page === "management" ? "active" : ""}`}
                onClick={() => setPage("management")}
            >
                <DoorOpen size={19} />
                <span>Room Management</span>
            </button>

            <div className="sidebar-footer">
                <p>HOSTEL MANAGEMENT</p>
                <small>Room Records System</small>
            </div>
        </aside>
    );
}

export default Sidebar;
