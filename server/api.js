import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";


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
