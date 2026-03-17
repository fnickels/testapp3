import { Router } from "express";

import { currentWeatherController } from "../controllers/weatherController.js";

const weatherRouter = Router();

weatherRouter.get("/current", currentWeatherController);

export { weatherRouter };
