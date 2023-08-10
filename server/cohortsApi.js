import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const router = Router();
router.get("/cohorts", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM cohorts");
		res.json(result.rows);
	} catch (error) {
		logger.error(error);
		res.status(200).json(error);
Fatemeh Rahimi this conversation as resolved.
	};
});

router.get("/cohorts/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const result = await db.query("SELECT * FROM cohorts WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: `cohort with id ${id} not found` });
		}
		res.json(result.rows[0]);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to retrieve cohort" });
	}
});

router.post("/cohorts", async (req, res) => {
	const { name, description } = req.body;

	// Check if all required fields are provided
	if (!name || !description) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	try {
		await db.query("INSERT INTO cohorts (name) VALUES ($1)", [
			name,
		]);
		res.status(201).send();
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to create " });
	}
});

router.delete("/cohorts/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const result = await db.query("DELETE FROM cohorts WHERE id = $1", [id]);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: `cohort with id ${id} not found` });
		}

		res.status(204).json({ message: `cohort with id ${id} is deleted` });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete cohort" });
	}
});

export default router;