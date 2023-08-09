import express from "express";
import db, { connectDb } from "./db";

const app = express();

// Connect to the database
connectDb();

// Define the API endpoint to get cohort by GitHub username
app.get("/api/cohots/github/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const query = `
      SELECT cohorts.* FROM cohorts
      JOIN trainees ON cohorts.id = trainees.cohort_id
      WHERE trainees.github_name = $1;
    `;
    const result = await db.query(query, [username]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Cohort not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
