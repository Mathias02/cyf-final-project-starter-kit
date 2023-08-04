import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

const fetchDataFromDb = async () => {
  try {
    const sqlInsert =
      "INSERT INTO modules (modulename, startdate, enddate, cohort) VALUES ('Ele', '2023-12-01', '2023-12-01', 'South Africa');";
    const result = await db.query(sqlInsert);
    logger.debug("Data inserted successfully!");
    // Do something with the result if needed
  } catch (err) {
    logger.error("%O", err);
    throw err; // Rethrow the error to handle it later
  }
};

// Call the function to fetch data from the database
fetchDataFromDb();

router.get("/", (_, res) => {
  logger.debug("Welcoming everyone...");
  res.json({ message: "Hello, world!" });
});

export default router;
