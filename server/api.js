import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/login", (req, res) => {
	const { username, hashPassword } = req.body;
	logger.debug(username);
	logger.debug(hashPassword);
	db.query(
		"SELECT * FROM users WHERE name = $1 AND password = $2",
		[username, hashPassword],
		(error, results) => {
			if (error) {
				throw error;
			}
			if (results.rows.length > 0) {
				res.send("Login successful");
			} else {
				res.send("Invalid login credentials");
			}
		}
	);
});
export default router;
