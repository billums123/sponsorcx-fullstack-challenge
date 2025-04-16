import express from "express";
const router = express.Router();

// Get all deals for an organization
router.get("/organizations/:organizationId/deals", (req, res) => {
  res.send("Hello from get orgs!");
});

export default router;
