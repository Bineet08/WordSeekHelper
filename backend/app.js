import express from "express";
import cors from "cors";
import solveRoute from "./routes/solve.js";

const app = express();

app.use(cors({
  origin:"*"
}));
app.use(express.json());

app.use("/solve", solveRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
