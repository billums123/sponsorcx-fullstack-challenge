import express from "express";
import cors from "cors";
import initializeDatabase from "./db";
import dealsRouter from "./routes/dealsRouter";
import organizationsRouter from "./routes/organizationsRouter";

const app = express();
const port = process.env.PORT || 3000;

const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Organization Routes
app.use("/api/organizations", organizationsRouter);

// Deals Routes
app.use("/api", dealsRouter);

// Catch all 404
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested resource at ${req.originalUrl} was not found`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
