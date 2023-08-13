import express from "express";
import cors from "cors";
import db from "./db";
import { Router } from "express";
import logger from "./utils/logger";

const app = express();
const router = Router();

// Middleware
app.use(express.json());
app.use(cors());




router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});




// Endpoint to create a new cohort

router.post("/api/cohorts", (req, res) => {
	const query = req.body;
	const insertQuery = "INSERT INTO cohorts (name) VALUES ($1) RETURNING id";

	try {
		db.query(insertQuery, [query.name])
			.then((result) => {
				res.json({ id: result.rows[0].id });
			})
			.catch((error) => {
				logger.debug(error);
				res
					.status(500)
					.json({ error: "An error occurred while inserting the cohort." });
			});
	} catch (error) {
		logger.debug(error);
		res.status(500).json({ error: "An unexpected error occurred." });
	}
});

router.get("/api/cohorts", (req, res) => {
	const selectQuery = "SELECT * FROM cohorts";
	try {
		db.query(selectQuery)
			.then((result) => {
				res.json(result.rows);
			})
			.catch((error) => {
				logger.debug(error); // Log the error
				res
					.status(500)
					.json({ error: "An error occurred while fetching cohorts." });
			});
	} catch (error) {
		logger.debug(error);
		res.status(500).json({ error: "An unexpected error occurred." });
	}
});


export default router;