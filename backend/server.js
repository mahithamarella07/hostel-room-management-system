
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Check database connection
app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({ message: "Server and database connected!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Validate room details
function validateRoom(data) {
    const { room_number, student_name, room_capacity, block } = data;

    if (!room_number || !student_name || !block || room_capacity === undefined || room_capacity === null) {
        return "All fields are required";
    }

    if (!/^[A-Za-z0-9-]+$/.test(String(room_number).trim())) {
        return "Invalid room number";
    }

    if (String(room_number).trim().length > 20) {
        return "Room number must be at most 20 characters";
    }

    if (String(student_name).trim().length > 100 || String(block).trim().length > 50) {
        return "Student name or block is too long";
    }

    if (!Number.isInteger(Number(room_capacity)) || Number(room_capacity) <= 0) {
        return "Room capacity must be a positive whole number";
    }

    return null;
}

// GET all rooms and search by room number
app.get("/api/rooms", async (req, res) => {
    try {
        const search = req.query.search || "";

        const [rooms] = await db.query(
            "SELECT * FROM rooms WHERE room_number LIKE ? ORDER BY id DESC",
            [`%${search}%`]
        );

        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ADD a room
app.post("/api/rooms", async (req, res) => {
    try {
        const error = validateRoom(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        const { room_number, student_name, room_capacity, block } = req.body;

        const [result] = await db.query(
            "INSERT INTO rooms (room_number, student_name, room_capacity, block) VALUES (?, ?, ?, ?)",
            [
                String(room_number).trim(),
                String(student_name).trim(),
                Number(room_capacity),
                String(block).trim()
            ]
        );

        res.status(201).json({
            message: "Room record added successfully!",
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a room
app.put("/api/rooms/:id", async (req, res) => {
    try {
        const error = validateRoom(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        const { room_number, student_name, room_capacity, block } = req.body;

        const [result] = await db.query(
            "UPDATE rooms SET room_number = ?, student_name = ?, room_capacity = ?, block = ? WHERE id = ?",
            [
                String(room_number).trim(),
                String(student_name).trim(),
                Number(room_capacity),
                String(block).trim(),
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Room record not found" });
        }

        res.json({ message: "Room record updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a room
app.delete("/api/rooms/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM rooms WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Room record not found" });
        }

        res.json({ message: "Room record deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
