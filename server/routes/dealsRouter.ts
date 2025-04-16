import express from "express";
import dealsController from "../controllers/dealsController";
const router = express.Router();

// Get all deals for an organization
router.get(
  "/organizations/:organizationId/deals",
  dealsController.getDealsForOrganization
);

export default router;
