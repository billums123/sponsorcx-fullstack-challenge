import express from "express";
import organizationsController from "../controllers/organizationsController";

const router = express.Router();

router.get("/", organizationsController.getAllOrganizations);

export default router;
