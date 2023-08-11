import { Router } from "express";
import express from "express";
import cors from "cors";
import db from "./db";
import logger from "./utils/logger";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});




// Endpoint to create a new cohort
router.post("/api/cohorts", (req, res) => {
	const query = req.body;
	const str = "INSERT INTO cohorts (cohortname) VALUES ($1) RETURNING id";
	try {
		db.query(str, [query.cohortname]).then((result) => res.send(result));
	} catch (error) {
		logger.debug(error);
	}
});




export default router;