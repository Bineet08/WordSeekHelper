import express from "express";
import fs from "fs";
import path from "path";
import { filterWords } from "../logic/filterWords.js";

const router = express.Router();

const words = fs
  .readFileSync(path.resolve("data/words.txt"), "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(w => w.length === 5);

router.post("/", (req, res) => {
  console.log("Received /solve request with body:", req.body);
  const { pattern, included = "", excluded = "" } = req.body;

  if (!pattern || pattern.length !== 5) {
    return res.status(400).json({ error: "Invalid pattern" });
  }

  const result = filterWords(
    words,
    pattern.toLowerCase(),
    included.toLowerCase(),
    excluded.toLowerCase()
  );

  res.json({
    count: result.length,
    words: result
  });
});

export default router;
