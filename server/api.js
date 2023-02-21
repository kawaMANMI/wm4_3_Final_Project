import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
import bcrypt from "bcryptjs-react";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
//get students list
router.get("/students", (_, res) => {
	db.query(
		"SELECT  users.id, users.name, users.class_code, user_learning_obj.score FROM users INNER JOIN user_learning_obj ON users.id = user_learning_obj.user_id"
	)
		.then((result) => res.json(result.rows))
		.catch((err) => {
			res.status(500).json(err);
		});
});

// Cookie
// router.get("/testCookie", async (req, res) => {
// 	const userId = req.session.userId;
// 	const role = req.session.role;
// 	if(role !== "Mentor"){
// 		res.status(403).json({ "msg": "Forbidden!" });
// 		return;
// 	}
// 	res.json({ "userId": userId, "role": role, "msg": "Hello Cookie" });
// 	return;
// });

// login endpoint
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const result = await db.query("SELECT * FROM users WHERE name=$1", [
			username,
		]);
		const user = result.rows[0];

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			req.session.userId = user.id;
			req.session.role = user.role;
			res.json({ id: user.id, name: user.name, role: user.role });
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

// Endpoint for user profile
router.get("/user-profile", (req, res) => {
	// const [userIdent, setUserIdent] = use
	const user_Id = req.session.userId;
	// const user_Id = req.params.id;
	db.query(
			"SELECT users.name, users.class_code, region.name AS region FROM users INNER JOIN region ON users.region_id = region.id AND users.id=$1",
			[user_Id]
		)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ Error: error.message }));
});
export default router;
// router.get("/user-profile", async (req, res) => {
// 	// const [userIdent, setUserIdent] = use
// 	const result = await db
// 		.query(
// 			"SELECT users.name, users.class_code, region.name AS region FROM users INNER JOIN region ON users.region_id = region.id AND users.name=$1",
// 			["Ali"]
// 		)
// 		.then((result) => res.json(result.rows))
// 		.catch((error) => res.status(500).json({ Error: error.message }));
// });


// router.get("/checklist", (req, res) => {
// 	db.query(
// 		`SELECT s.id AS skill_id, s.skill_name, array_agg(json_build_object('objective_id', lo.id,'objective', lo.objective)) AS objectives
// 		 FROM skills AS s
// 		 INNER JOIN learning_objectives AS lo
// 		 ON s.id = lo.skill_id
// 		 GROUP BY s.id, s.skill_name
// 		 ORDER BY s.id;`
// 	)
// 		.then((result) => res.json(result.rows))
// 		.catch((error) => res.status(500).json({ error: error.message }));
// });