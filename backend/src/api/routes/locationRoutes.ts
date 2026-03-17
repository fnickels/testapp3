import { Router } from "express";

import { searchLocationController } from "../controllers/locationController.js";

const locationRouter = Router();

locationRouter.get("/search", searchLocationController);

export { locationRouter };
