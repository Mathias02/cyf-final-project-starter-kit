import { Router } from "express";
import express from "express";
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
import db from "./db";
import logger from "./utils/logger";

const router = Router();
// app.use(express.json());

//POST

router.post("/modules", async (req, res) => {
	try {
	  const { title, startDate, endDate, location, cohort } = req.body;
	  const query = `
		INSERT INTO modules (title, start_date, end_date, location, cohort)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *`;
	  const values = [title, startDate, endDate, location, cohort];
	  const result = await pool.query(query, values);
	  res.status(201).json(result.rows[0]);
	} catch (error) {
	  logger.error("Error adding module:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });


// router.post("/modules", async (req, res) => {
// 	const { moduleName, startDate, endDate, cohort } = req.body;
// 	try {
// 	  await db(moduleName, startDate, endDate, cohort);
// 	  res.json({ message: "Data inserted successfully!" });
// 	} catch (err) {
// 	  console.error("Error inserting data:", err);
// 	  res.status(500).json({ error: "Error inserting data." });
// 	}
//   });


router.get("/", (_, res) => {
  logger.debug("Welcoming everyone...");
  res.json({ message: "Hello, world!" });
});



app.listen(3036, () => {
	console.log("Server running on http://localhost:3000");
  });
export default router;
