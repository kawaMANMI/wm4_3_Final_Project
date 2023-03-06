import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
//get skills and scores for all students and region
router.get("/skills-scores", (req, res) => {
	db.query(
		`SELECT u.id AS student_id, u.name AS student_name, r.name AS region_name, s.skill_name, SUM(ulo.score) AS total_score
FROM user_learning_obj ulo
JOIN users u ON ulo.user_id = u.id
JOIN skills s ON ulo.lo_id = s.id
JOIN region r ON u.region_id = r.id
WHERE r.name IN ('North West', 'London', 'West Midlands', 'Cape Town')
GROUP BY u.id, u.name, r.name, s.skill_name
ORDER BY u.name, s.skill_name ASC;
	`
	)
		.then((result) => {
			res.json(result.rows);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// get skill by region filter and class
router.get("/skills-by-region", (req, res) => {
	const region = req.query.region;
	const classCode = req.query.classCode;
	const query = `
SELECT u.id AS student_id, u.name AS student_name, u.class_code AS class_code, r.name AS region_name, s.skill_name, SUM(ulo.score) AS total_score
FROM user_learning_obj ulo
JOIN users u ON ulo.user_id = u.id
JOIN skills s ON ulo.lo_id = s.id
JOIN region r ON u.region_id = r.id
WHERE ($1::text IS NULL OR r.name = $1::text)
AND ($2::text IS NULL OR u.class_code = $2::text)
GROUP BY u.id, u.name, r.name, s.skill_name
ORDER BY u.name ASC
  `;
	const params = [region || null, classCode || null];

	db.query(query, params, (error, result) => {
		if (error) {
			res.status(500).json({ error: "Error executing query" });
		} else {
			res.json(result.rows);
		}
	});
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
	const currentDate = new Date();
	const editDate = new Date("2023-02-28");
	if (currentDate.getTime() > editDate.getTime()) {
		return res.status(400).json({ error: "Editing is not allowed" });
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
//delete  a learning object
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

//get specific user profile
router.get("/user-profile/:id", (req, res) => {
	const user_Id = req.params.id;
	db.query(
		"SELECT users.name, users.username, users.class_code, region.name AS region FROM users INNER JOIN region ON users.region_id = region.id AND users.id=$1",
		[user_Id]
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ Error: error.message }));
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
		const result = await db.query("SELECT * FROM users WHERE username=$1", [
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
	{ 1: ["WM1", "WM2", "WM3", "WM4"] },
	{ 2: ["NW1", "NW1", "NW3", "NW4"] },
	{ 3: ["LON1", "LON2", "LON3", "LON4"] },
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

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;
	// Send a password reset email to the user's email address
	try {
		// Check if the email is already registered
		const existingUser = await db.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (existingUser.rowCount < 1) {
			return res.status(200).send("Email  is not exist");
		} else {
			logger.debug("Email  is  exist");
		}
		// Create a random token
		const token = crypto.randomBytes(20).toString("hex");

		const transporter = nodemailer.createTransport({
			pool: true,
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "devdreamers2023@gmail.com",
				pass: "123qwe_A",
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// Set up email message
		const message = {
			from: "devdreamers2023@gmail.com",
			to: { email },
			subject: "Password Reset",
			text: `Please use the following token to reset your password: ${token}`,
		};

		// Send email
		try {
			const info = await transporter.sendMail(message);
			await logger.debug(`Message sent: ${info.messageId}`);
			await db.query("UPDATE users SET password = $1 WHERE email = $2", [
				token,
				email,
			]);
			return res.status(200).send("Email sent32!");
		} catch (error) {
			return logger.error(error);
		}

		// Return success response
	} catch (error) {
		logger.error(error);
		res.status(500).send("Internal server error");
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

// Save the user selected score for each objective
router.post("/scores", async (req, res) => {
	const userID = req.session.userId;
	const { selectedScores } = req.body;

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
router.get("/recent-scores", (req, res) => {
	const userID = req.session.userId;
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

//Get all the scores for user id
router.get("/all-scores", async (req, res) => {
	const userID = req.session.userId;
	db.query(
		`SELECT TO_CHAR(user_learning_obj.submitted_at,'Mon-DD') AS date,
    ROUND(AVG(CASE WHEN skills.skill_name = 'HTML/CSS' THEN user_learning_obj.score ELSE NULL END)) AS HTML_CSS,
      ROUND(AVG(CASE WHEN skills.skill_name = 'Git' THEN user_learning_obj.score ELSE NULL END)) AS Git,
      ROUND(AVG(CASE WHEN skills.skill_name = 'JavaScript' THEN user_learning_obj.score ELSE NULL END)) AS JavaScript,
      ROUND(AVG(CASE WHEN skills.skill_name = 'React' THEN user_learning_obj.score ELSE NULL END)) AS React,
      ROUND(AVG(CASE WHEN skills.skill_name = 'Node' THEN user_learning_obj.score ELSE NULL END)) AS Node,
      ROUND(AVG(CASE WHEN skills.skill_name = 'Database-Postgres' THEN user_learning_obj.score ELSE NULL END)) AS Database_Postgres
    FROM user_learning_obj
    JOIN learning_objectives ON user_learning_obj.lo_id = learning_objectives.id
    JOIN skills ON learning_objectives.skill_id = skills.id
    WHERE user_learning_obj.user_id = ${userID}
    GROUP BY TO_CHAR(user_learning_obj.submitted_at,'Mon-DD')
    ORDER BY TO_CHAR(user_learning_obj.submitted_at,'Mon-DD')`
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});

// Get the final average scores for all skills for user id
router.get("/final-score", async (req, res) => {
	const userID = req.session.userId;
	db.query(
		`SELECT AVG(AVERAGE_SCORE) AS SCORE
FROM
	(SELECT S.SKILL_NAME,
			ROUND(AVG(ULO.SCORE)) AS AVERAGE_SCORE
		FROM
			(SELECT LO.SKILL_ID,
					ULO.*
				FROM USER_LEARNING_OBJ AS ULO
				JOIN
					(SELECT LO_ID,
							MAX(SUBMITTED_AT) AS RECENT_SUBMITTED_AT
						FROM USER_LEARNING_OBJ
						WHERE USER_ID = ${userID}
						GROUP BY LO_ID) AS RECENT_ULO ON ULO.LO_ID = RECENT_ULO.LO_ID
				AND ULO.SUBMITTED_AT = RECENT_ULO.RECENT_SUBMITTED_AT
				JOIN LEARNING_OBJECTIVES AS LO ON ULO.LO_ID = LO.ID) AS ULO
		JOIN SKILLS AS S ON ULO.SKILL_ID = S.ID
		GROUP BY S.SKILL_NAME
		ORDER BY S.SKILL_NAME) as DATA;`
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});

//CRUD ENDPOINTS FOR RESOURCES
// GET all resources for skill id
router.get("/all-resources/:skill/:id", async (req, res) => {
	const skill_Id = req.params.id;
	db.query(`SELECT * FROM resources WHERE skill_id=${skill_Id};`)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});

// GET endpoints for resources per student
router.get("/resources", async (req, res) => {
	// const userID = req.session.userId;
	const userID = 1;
	db.query(
		`SELECT title, url, reading_time, AVERAGE_SCORE FROM
(SELECT S.id AS skill_id,
	ROUND(AVG(ULO.SCORE)) AS AVERAGE_SCORE
FROM
	(SELECT LO.SKILL_ID,
			ULO.*
		FROM USER_LEARNING_OBJ AS ULO
		JOIN
			(SELECT LO_ID,
					MAX(SUBMITTED_AT) AS RECENT_SUBMITTED_AT
				FROM USER_LEARNING_OBJ
				WHERE USER_ID = ${userID}
				GROUP BY LO_ID) AS RECENT_ULO ON ULO.LO_ID = RECENT_ULO.LO_ID
		AND ULO.SUBMITTED_AT = RECENT_ULO.RECENT_SUBMITTED_AT
		JOIN LEARNING_OBJECTIVES AS LO ON ULO.LO_ID = LO.ID) AS ULO
JOIN SKILLS AS S ON ULO.SKILL_ID = S.ID
GROUP BY S.id
ORDER BY S.id) AS avgs INNER JOIN resources r ON r.skill_id = avgs.skill_id WHERE average_score < 5
ORDER BY average_score ASC
LIMIT 3;`
	)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});

//Get all assessment for skills
router.get("/assessment/:skill/:id", async (req, res) => {
	const skill_Id = req.params.id;
	db.query(`SELECT * FROM coursework WHERE course_skill=${skill_Id};`)
		.then((result) => res.json(result.rows))
		.catch((error) => res.status(500).json({ error: error.message }));
});
export default router;
