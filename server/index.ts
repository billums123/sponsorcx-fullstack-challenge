import express from "express";
import cors from "cors";
import initializeDatabase from "./db";
import dealsRouter from "./routes/dealsRouter";

const app = express();
const port = process.env.PORT || 3000;

const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉", rows });
});

app.use("/api", dealsRouter);

// catch all 404
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested resource at ${req.originalUrl} was not found`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
