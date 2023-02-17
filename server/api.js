import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
import bcrypt from "bcryptjs-react";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.get("/students", (_, res) => {
	db.query(
		"SELECT new_users.name, user_learning_obj.score FROM new_users INNER JOIN user_learning_obj ON new_users.id = user_learning_obj.user_id"
	)
		.then((result) => res.json(result.rows))
		.catch((err) => {
			res.status(500).json(err);
		});
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
		const result = await db.query("SELECT * FROM new_users WHERE name=$1", [
			username,
		]);
		const user = result.rows[0];

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			res.send(user.role);
			return;
		} else {
			return res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (err) {
		logger.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

//Get the all skills and learning objectives
router.get("/checklist", (req, res) => {
	db.query(
		`SELECT s.id AS skill_id, s.skill_name, array_agg(json_build_object('objective_id', lo.id,'objective', lo.objective)) AS objectives
		 FROM skills AS s
		 INNER JOIN learning_objectives AS lo
		 ON s.id = lo.skill_id
		 GROUP BY s.id, s.skill_name
		 ORDER BY s.id;`
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});
export default router;
