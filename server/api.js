import express from "express";
import cors from "cors";
import db from "./db";
import logger from "./utils/logger";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());




app.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});




// Endpoint to create a new cohort
app.post("/api/cohorts", (req, res) => {
	const query = req.body;
	const str = "INSERT INTO cohorts (name) VALUES ($1) RETURNING id";
	try {
		db.query(str, [query.name]).then((result) => res.send(result));
	} catch (error) {
		logger.debug(error);
	}
});




export default app;