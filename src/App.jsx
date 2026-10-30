
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import Management from "./Management";
import api from "./api";

function App() {
    const [page, setPage] = useState("home");
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await api.get("/rooms");
                setRooms(response.data);
            } catch (err) {
                setError("Could not connect to the server. Please check your backend.");
            } finally {
                setLoading(false);
            }
        }

        fetchRooms();
    }, []);

    return (
        <div className="app-layout">
            <Sidebar page={page} setPage={setPage} />

            <main className="main-content">
                {loading ? (
                    <div className="loading-screen">
                        Loading Haven...
                    </div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : page === "home" ? (
                    <Home rooms={rooms} setPage={setPage} />
                ) : (
                    <Management rooms={rooms} setRooms={setRooms} />
                )}
            </main>
        </div>
    );
}

export default App;
