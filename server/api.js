import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
import bcrypt from "bcryptjs-react";

//Thid data created by Irina for test
const data = [
	{
		id: 1,
		name: "John",
		score: 5,
	},
	{
		id: 2,
		name: "Mark",
		score: 1,
	},
	{
		id: 3,
		name: "Lisa",
		score: 2,
	},
	{
		id: 4,
		name: "Chris",
		score: 3,
	},
	{
		id: 5,
		name: "Anthony",
		score: 4,
	},
];
const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.get("/students", (_, res) => {
	let students = data;
	res.send(students);
});

// router.post("/login", (req, res) => {
// 	const { username, password } = req.body;
// 	logger.debug(username);
// 	logger.debug(hashPassword);
// 	db.query(
// 		"SELECT * FROM new_users WHERE name = $1 AND password = $2",
// 		[username, hashPassword],
// 		(error, results) => {
// 			if (error) {
// 				throw error;
// 			}
// 			if (results.rows.length > 0) {
// 				res.send("Login successful");
// 			} else {
// 				res.send("Invalid login credentials");
// 			}
// 		}
// 	);
// });

// login endpoint
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const result = await db.query(
			"SELECT * FROM new_users WHERE name=$1",
			[username]
		);
		const user = result.rows[0];

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		const match = await bcrypt.compare(password, user.password);
		logger.debug(user.password);
		if (match) {
			return res.json({ message: "Login successful" });
		} else {
			return res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (err) {
		logger.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
