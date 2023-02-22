import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
//get students list
router.get("/students", (_, res) => {
	db.query(
		"SELECT  users.id, users.name, users.class_code FROM users INNER JOIN user_learning_obj ON users.id = user_learning_obj.user_id"

		// "SELECT  users.id, users.name, users.class_code, user_learning_obj.score FROM users INNER JOIN user_learning_obj ON users.id = user_learning_obj.user_id"
	)
		.then((result) => res.json(result.rows))
		.catch((err) => {
			res.status(500).json(err);
		});
});
router.get("/skills", (req, res) => {
	db.query(
		`SELECT s.id AS skill_id, s.skill_name, array_agg(json_build_object('objective_id', lo.id,'objective', lo.objective)) AS objectives
		 FROM skills AS s
		 INNER JOIN learning_objectives AS lo
		 ON s.id = lo.skill_id
		 GROUP BY s.id, s.skill_name
		 ORDER BY s.id`
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});

//get a specific learning_obj
router.get("/learning_objectives/:id", (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).json({ error: "Invalid id" });
	}
	db.query("SELECT objective FROM learning_objectives WHERE id = $1", [id])
		.then((result) => res.json(result))
		.catch((error) => res.status(500).json({ error: error.message }));
});
//update a learning_objective
router.put("/learning_objectives/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const { objective } = req.body;
	if (isNaN(id)) {
		return res.status(400).json({ error: "Invalid id" });
	}
	try {
		await db
			.query(`UPDATE learning_objectives SET objective = $1 WHERE id = ${id}`, [
				objective,
			])
			.then(() => res.send(`Objective ${id} updated!`));
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.delete("/learning_objectives/:id", (req, res) => {
	const id = req.params.id;
	if (isNaN(id)) {
		return res.status(400).json({ error: "Invalid id" });
	}
	db.query(
		`DELETE FROM user_learning_obj WHERE lo_id = ${id}; DELETE FROM learning_objectives WHERE id = ${id};`
	)
		.then(() => res.json("Objective was deleted successfully"))
		.catch((error) => res.status(500).json({ error: error.message }));
});

//post a specific learning_obj
router.post("/learning_objectives", async (req, res) => {
	const { objective } = req.body;
	if (!objective) {
		return res.status(400).json({ error: "Objective is required" });
	}
	try {
		await db.query("INSERT INTO learning_objectives(objective) VALUES($1)", [
			objective,
		]);
		res.json("Objective was added successfully");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
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
	{ 1: ["WM4"] },
	{ 2: ["NW3"] },
	{ 3: ["LON9"] },
	{ 4: ["CT2"] },
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

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;
	// Send a password reset email to the user's email address
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "your-email@gmail.com",
			pass: "your-email-password",
		},
	});

	const mailOptions = {
		from: "your-email@gmail.com",
		to: email,
		subject: "Password Reset Request",
		text: "You have requested to reset your password. Please use this token to reset your password: resetToken",
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.debug(error);
			res.status(500).send("Error sending email");
		} else {
			logger.debug("Email sent: " + info.response);
			res.status(200).send("Password reset email sent");
		}
	});
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
		"SELECT users.name, users.username, users.class_code, region.name AS region FROM users INNER JOIN region ON users.region_id = region.id AND users.id=$1",
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
