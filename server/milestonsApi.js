import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
import router from "./cohorotsApi";

// Endpoint to get all milestones for a specific cohort
router.get("/api/milestones", async (req, res) => {
    try {
        const { cohort } = req.query;
        const milestones = await db.any("SELECT * FROM milestones WHERE cohort_id = $1", [cohort]);
        res.json(milestones);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to add a milestone
router.post("/api/milestones", async (req, res) => {
    try {
        const { name, date, github_pr, codewars_rank, cohort_id } = req.body;
        await db.none("INSERT INTO milestones(name, date, github_pr, codewars_rank, cohort_id) VALUES($1, $2, $3, $4, $5)",
                      [name, date, github_pr, codewars_rank, cohort_id]);
        res.send("Milestone added successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to get milestone by ID
router.get("/api/milestones/:id", async (req, res) => {
    try {
        const milestone = await db.one("SELECT * FROM milestones WHERE id = $1", [req.params.id]);
        res.json(milestone);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to update a milestone
router.put("/api/milestones/:id", async (req, res) => {
    try {
        const { name, date, github_pr, codewars_rank, cohort_id } = req.body;
        await db.none("UPDATE milestones SET name = $1, date = $2, github_pr = $3, codewars_rank = $4 WHERE id = $5",
                      [name, date, github_pr, codewars_rank, req.params.id]);
        res.send("Milestone updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to delete a milestone
router.delete("/api/milestones/:id", async (req, res) => {
    try {
        await db.none("DELETE FROM milestones WHERE id = $1", [req.params.id]);
        res.send("Milestone deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});
