
import React, { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, DoorOpen } from "lucide-react";
import api from "./api";

function Management({ rooms, setRooms }) {
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");

    const emptyForm = {
        room_number: "",
        student_name: "",
        room_capacity: "",
        block: ""
    };

    const [form, setForm] = useState(emptyForm);

    async function loadRooms(term = search) {
        try {
            setLoading(true);
            const response = await api.get("/rooms", {
                params: { search: term }
            });
            setRooms(response.data);
            setError("");
        } catch (err) {
            setError("Unable to load room records.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRooms("");
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function openAddForm() {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(true);
        setNotice("");
        setError("");
    }

    function openEditForm(room) {
        setForm({
            room_number: room.room_number,
            student_name: room.student_name,
            room_capacity: room.room_capacity,
            block: room.block
        });

        setEditingId(room.id);
        setShowForm(true);
        setNotice("");
        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setNotice("");
        setError("");

        if (
            !form.room_number.trim() ||
            !form.student_name.trim() ||
            !form.room_capacity ||
            !form.block.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^[A-Za-z0-9-]+$/.test(form.room_number.trim())) {
            setError("Room number can contain only letters, numbers and hyphens.");
            return;
        }

        if (!Number.isInteger(Number(form.room_capacity)) ||
            Number(form.room_capacity) <= 0) {
            setError("Room capacity must be a positive whole number.");
            return;
        }

        const roomData = {
            ...form,
            room_number: form.room_number.trim(),
            student_name: form.student_name.trim(),
            room_capacity: Number(form.room_capacity),
            block: form.block.trim()
        };

        try {
            if (editingId) {
                await api.put(`/rooms/${editingId}`, roomData);
                setNotice("Room record updated successfully!");
            } else {
                await api.post("/rooms", roomData);
                setNotice("Room record added successfully!");
            }

            setForm(emptyForm);
            setShowForm(false);
            setEditingId(null);
            await loadRooms();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this room record?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/rooms/${id}`);
            setNotice("Room record deleted successfully!");
            await loadRooms();
        } catch (err) {
            setError("Unable to delete room record.");
        }
    }

    return (
        <div className="management-page">

            <div className="page-heading">
                <div>
                    <p className="eyebrow">RECORD MANAGEMENT</p>
                    <h1>Room Management</h1>
                    <p className="heading-description">
                        Add, search, update and manage hostel room records.
                    </p>
                </div>

                <button className="primary-btn" onClick={openAddForm}>
                    <Plus size={18} /> Add Room
                </button>
            </div>

            {notice && <div className="success-message">{notice}</div>}
            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <div className="form-card">
                    <div className="section-heading">
                        <div>
                            <h2>{editingId ? "Update Room" : "Add New Room"}</h2>
                            <p>Enter the room and student details below.</p>
                        </div>

                        <button
                            className="close-btn"
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Room Number</label>
                                <input
                                    name="room_number"
                                    value={form.room_number}
                                    onChange={handleChange}
                                    placeholder="e.g. 101"
                                    maxLength="20"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Student Name</label>
                                <input
                                    name="student_name"
                                    value={form.student_name}
                                    onChange={handleChange}
                                    placeholder="Enter student name"
                                    maxLength="100"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Room Capacity</label>
                                <input
                                    type="number"
                                    name="room_capacity"
                                    value={form.room_capacity}
                                    onChange={handleChange}
                                    placeholder="e.g. 3"
                                    min="1"
                                    step="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Block</label>
                                <input
                                    name="block"
                                    value={form.block}
                                    onChange={handleChange}
                                    placeholder="e.g. Block A"
                                    maxLength="50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="primary-btn">
                                {editingId ? "Save Changes" : "Add Record"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="records-card">
                <div className="section-heading">
                    <div>
                        <h2>All Room Records</h2>
                        <p>{rooms.length} records displayed</p>
                    </div>
                </div>

                <div className="search-box">
                    <Search size={19} />
                    <input
                        type="text"
                        placeholder="Search by room number..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            loadRooms(e.target.value);
                        }}
                    />
                </div>

                {loading ? (
                    <p className="empty-state">Loading records...</p>
                ) : rooms.length === 0 ? (
                    <div className="empty-state">
                        <DoorOpen size={35} />
                        <h3>No records found</h3>
                        <p>Try another room number or add a new record.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="room-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Room Number</th>
                                    <th>Student Name</th>
                                    <th>Capacity</th>
                                    <th>Block</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>#{room.room_number}</td>
                                        <td>{room.student_name}</td>
                                        <td>{room.room_capacity}</td>
                                        <td>
                                            <span className="block-tag">
                                                {room.block}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    title="Edit"
                                                    onClick={() => openEditForm(room)}
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    title="Delete"
                                                    onClick={() => handleDelete(room.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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

export default Management;
