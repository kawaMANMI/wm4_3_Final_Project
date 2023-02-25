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
		`SELECT u.id, u.name, u.class_code, r.name AS region_name, SUM(ulo.score) AS total_score
FROM users u
INNER JOIN user_learning_obj ulo ON u.id = ulo.user_id
INNER JOIN region r ON u.region_id = r.id
GROUP BY u.id, u.name, u.class_code, r.name
ORDER BY total_score DESC;


`
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
//add a learning_objective
router.post("/learning_objectives/", async (req, res) => {
	const { skill_id, objective } = req.body;

	if (!objective || !skill_id) {
		return res
			.status(400)
			.json({ error: "Objective  and skill_id is required" });
	}

	try {
		await db
			.query(
				"INSERT INTO learning_objectives (objective, skill_id) VALUES ($1,$2)",
				[objective, skill_id]
			)
			.then(() => res.json({ message: "Objective created!" }));
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

//update learning-obj
router.put("/learning_objectives/:id", async (req, res) => {
	const id = req.params.id;
	const { objective } = req.body;
	if (!objective || !id) {
		return res.status(400).json({ error: "Objective  is required" });
	}
	try {
		await db.query(
			"UPDATE learning_objectives SET objective = $1 WHERE id = $2",
			[objective, id]
		);
	} catch (error) {
		res.status(500).json({ error: error.message });
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
// router.post("/learning_objectives", async (req, res) => {
// 	const { objective } = req.body;
// 	if (!objective) {
// 		return res.status(400).json({ error: "Objective is required" });
// 	}
// 	try {
// 		await db.query("INSERT INTO learning_objectives(objective) VALUES($1)", [
// 			objective,
// 		]);
// 		res.json("Objective was added successfully");
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });
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

// Save the user selected score for each objective
router.post("/scores", async (req, res) => {
	const { userID, selectedScores } = req.body;

	const learningObjScores = Object.entries(selectedScores).map(
		([objectiveId, score]) => ({
			user_id: userID,
			lo_id: Number(objectiveId),
			score: score,
		})
	);
	try {
		learningObjScores.map((obj) =>
			db.query(
				"INSERT INTO user_learning_obj (user_id, lo_id, score) VALUES ($1, $2, $3)",
				[obj.user_id, obj.lo_id, obj.score]
			)
		);

		res.status(200).json({
			message: "Scores saved successfully.",
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to save scores" });
	}
});

//Get recent scores for user id
router.get("/recent-scores/:id", (req, res) => {
	let userID = parseInt(req.params.id);
	db.query(
		`SELECT s.skill_name, ROUND(AVG(ulo.score)) AS average_score
		FROM (
  			SELECT lo.skill_id, ulo.*
  			FROM user_learning_obj as ulo
  			JOIN (
    			SELECT lo_id, MAX(submitted_at) AS recent_submitted_at
    			FROM user_learning_obj
    			WHERE user_id = ${userID}
    			GROUP BY lo_id
  			) as recent_ulo ON ulo.lo_id = recent_ulo.lo_id AND ulo.submitted_at = recent_ulo.recent_submitted_at
  			JOIN learning_objectives as lo ON ulo.lo_id = lo.id
		) as ulo
		JOIN skills as s ON ulo.skill_id = s.id
		GROUP BY s.skill_name
		ORDER BY s.skill_name;`
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
