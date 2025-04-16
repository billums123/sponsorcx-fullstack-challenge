import { NextFunction, Request, Response } from "express";
import initializeDatabase from "../db";

const db = initializeDatabase();

interface OrganizationsController {
  getAllOrganizations: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

const organizationsController: OrganizationsController = {
  getAllOrganizations(req, res, next) {
    try {
      const stmt = db.prepare("SELECT * FROM organizations");
      const organizations = stmt.all();
      return res.status(200).json({ organizations });
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default organizationsController;
