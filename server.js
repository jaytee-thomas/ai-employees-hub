import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import { v4 as uuidv4 } from "uuid";
import {
  createTask,
  updateTask,
  getTask,
  getAllTasks,
  getChildTasks
} from "./services/taskStore.js";
import { routeTask } from "./services/router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "AI Employees Hub", time: new Date().toISOString() });
});

// create a task (CEO or any agent)
app.post("/tasks", async (req, res) => {
  const { title, description, type, assignee, payload, parentId } = req.body;

  const task = {
    id: uuidv4(),
    parentId: parentId || null,
    title: title || "Untitled task",
    description: description || "",
    type: type || "project-management",
    assignee: assignee || "PM-001",
    payload: payload || {},
    status: "created",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  createTask(task);
  const result = await routeTask(task);

  const finalTask = updateTask(task.id, {
    status: result.error ? "error" : "completed",
    result
  });

  res.status(201).json(finalTask);
});

// list all tasks
app.get("/tasks", (req, res) => {
  res.json(getAllTasks());
});

// get one task + its children
app.get("/tasks/:id", (req, res) => {
  const task = getTask(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });
  const children = getChildTasks(task.id);
  res.json({ ...task, subtasks: children });
});

app.listen(PORT, () => {
  console.log(`✅ AI Employees Hub running on http://localhost:${PORT}`);
});