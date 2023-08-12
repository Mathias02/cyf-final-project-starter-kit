import  { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

router.get("/api/trainees", async (req, res) => {
    const githubName = req.query.github_name;

    if (!githubName) {
        return res.status(400).json({ error: "GitHub name is required" });
    }

    try {
        // This is a pseudo code. Use your actual DB logic here
        const trainees = await db.query("SELECT * FROM trainees WHERE github_name = $1", [githubName]);

        if (trainees.rows.length === 0) {
            return res.status(404).json({ error: "Trainee not found" });
        }

        res.json(trainees.rows[0]);  // Assuming you want to return just the first match
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Failed to retrieve trainee" });
    }
});

export default router;
