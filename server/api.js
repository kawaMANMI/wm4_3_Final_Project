import { Router } from "express";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/login", (req, res) => {
	const { username, hashPassword } = req.body;
	logger.debug(username);
	logger.debug(hashPassword);
	knex("users")
		.select("*")
		.where({ username, hashPassword })
		.first()
		.then((user) => {
			if (user) {
				res.send("Login successful");
			} else {
				res.send("Invalid login credentials");
			}
		})
		.catch((error) => {
			throw error;
		});
});
export default router;
