import { NextFunction, Request, Response } from "express";
import initializeDatabase from "../db";

const db = initializeDatabase();

interface DealsController {
  getDealsForOrganization: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

const dealsController: DealsController = {
  // Return all deals for an organization with the provided organizationId
  getDealsForOrganization(req, res, next) {
    try {
      const { organizationId } = req.params;

      //   Check if the organization exists
      const orgCheckStmt = db.prepare(
        "SELECT * FROM organizations WHERE id = ?"
      );
      const organization = orgCheckStmt.get(organizationId);

      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const getDealsStmt = db.prepare(
        `
        SELECT d.*, a.name as account_name 
        FROM deals d
        JOIN accounts a ON d.account_id = a.id
        WHERE a.organization_id = ?
        `
      );

      // Fetch all rows
      const deals = getDealsStmt.all(organizationId);

      // Send the result as JSON
      return res.status(200).json({ deals });
    } catch (error) {
      console.error("Error fetching deals:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default dealsController;
