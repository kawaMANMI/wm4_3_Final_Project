import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const bcrypt = require("bcrypt");

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

const classes = [
	{ 1: ["WM1", "WM2", "WM3"] },
	{ 2: ["NW1", "NW2", "NW3"] },
	{ 3: ["LON1", "LON2", "LON3"] },
	{ 4: ["CT1", "CT2", "CT3"] },
];

router.get("/regions-and-classes", async (req, res) => {
	try {
		const result = await db.query("SELECT name FROM region");
		const regions = result.rows.map((row) => row.name);
		res.json({ regions, classes });
	} catch (error) {
		logger.error("Error getting region names:", error);
		res.status(500).send("Error getting region names");
	}
});

router.post("/signup", async (req, res) => {
	const { name, email, roleValue, password, regionId, classValue, username } =
		req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		// Check if the email or username is already registered
		const existingUser = await db.query(
			"SELECT * FROM users WHERE email = $1 OR username = $2",
			[email, username]
		);

		if (existingUser.rowCount > 0) {
			return res.status(200).send("Email or username is already exist");
		}
		const resultid = await db.query("SELECT MAX(id) FROM users");
		const maxId = resultid.rows[0].max;
		const result = await db.query(
			"INSERT INTO users (id, name, email, role, password, region_id, class_code, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
			[
				maxId + 1,
				name,
				email,
				roleValue,
				hashedPassword,
				regionId,
				classValue,
				username,
			]
		);

		res.status(200).send(`User ${result.rows[0].id} created successfully`);
		return;
	} catch (err) {
		logger.error(err);
		res.status(500).send("Something went wrong");
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
