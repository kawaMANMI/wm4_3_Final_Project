import { Router } from "express";

import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});


router.post("/login", (req, res) => {
	logger.debug("Welcoming everyone...");
	logger.debug(req.body.username);
	logger.debug(req.body.hashPassword);
	res.json({ message: "Hello, world!" });
});
export default router;
