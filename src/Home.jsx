
import React from "react";
import { DoorOpen, Users, Building2, BedDouble } from "lucide-react";
import StatCard from "./components/StatCard";

function Home({ rooms, setPage }) {
    const totalRooms = rooms.length;

    const totalCapacity = rooms.reduce(
        (total, room) => total + Number(room.room_capacity),
        0
    );

    const totalBlocks = new Set(
        rooms.map((room) => room.block)
    ).size;

    const recentRooms = rooms.slice(0, 5);

    return (
        <div className="home-page">

            <div className="page-heading">
                <div>
                    <p className="eyebrow">HOSTEL OVERVIEW</p>
                    <h1>Welcome to Haven 👋</h1>
                    <p className="heading-description">
                        Manage your hostel room records with ease.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => setPage("management")}
                >
                    + Manage Rooms
                </button>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Room Records"
                    value={totalRooms}
                    icon={<DoorOpen size={22} />}
                    subtitle="Total saved records"
                />

                <StatCard
                    title="Total Capacity"
                    value={totalCapacity}
                    icon={<Users size={22} />}
                    subtitle="Combined room capacity"
                />

                <StatCard
                    title="Hostel Blocks"
                    value={totalBlocks}
                    icon={<Building2 size={22} />}
                    subtitle="Different blocks"
                />

                <StatCard
                    title="Average Capacity"
                    value={
                        totalRooms
                            ? (totalCapacity / totalRooms).toFixed(1)
                            : 0
                    }
                    icon={<BedDouble size={22} />}
                    subtitle="Capacity per record"
                />
            </div>

            <div className="recent-section">
                <div className="section-heading">
                    <div>
                        <h2>Recent Room Records</h2>
                        <p>Latest records added to the system</p>
                    </div>

                    <button
                        className="text-btn"
                        onClick={() => setPage("management")}
                    >
                        View all →
                    </button>
                </div>

                {recentRooms.length === 0 ? (
                    <div className="empty-state">
                        <DoorOpen size={35} />
                        <h3>No room records yet</h3>
                        <p>Add your first room record to get started.</p>

                        <button
                            className="primary-btn"
                            onClick={() => setPage("management")}
                        >
                            Add Room Record
                        </button>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="room-table">
                            <thead>
                                <tr>
                                    <th>Room Number</th>
                                    <th>Student Name</th>
                                    <th>Capacity</th>
                                    <th>Block</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentRooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>#{room.room_number}</td>
                                        <td>{room.student_name}</td>
                                        <td>{room.room_capacity}</td>
                                        <td>
                                            <span className="block-tag">
                                                {room.block}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Home;
