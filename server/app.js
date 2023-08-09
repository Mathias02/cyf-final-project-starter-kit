
import express from "express";
import db from "./db";

const app = express();


// Define the API endpoint to get cohort by GitHub username
app.get("/api/cohots/github/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const query = "SELECT cohorts.* FROM cohorts JOIN trainees ON cohorts.id = trainees.cohort_id WHERE trainees.github_name = $1";
    const result = await db.query(query, [username]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cohort:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Your other endpoints and configurations ...

export default app;