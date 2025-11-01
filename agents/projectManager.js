// agents/projectManager.js
import axios from "axios";

const HUB_PORT = process.env.PORT || 4000;
const HUB_URL = process.env.HUB_URL || `http://localhost:${HUB_PORT}`;

// PM-001: breaks high-level requests into subtasks and pushes them back to hub
export async function handleProjectManagerTask(task) {
  const { payload = {} } = task;
  const { goal = "No goal specified", project = "general" } = payload;

  if (task.parentId) {
    return {
      summary: `PM-001 logged subtask "${task.title}" for ${project} and will coordinate with stakeholders.`,
      todo: [
        "Confirm requirements captured with CEO",
        "Sync outcomes back to the originating project"
      ]
    };
  }

  // Define subtasks
  const subtasks = [
    {
      title: `Clarify requirements for ${project}`,
      assignee: "CEO",
      type: "project-management",
      payload: { goal: `Clarify scope for ${project}`, project }
    },
    {
      title: `Create tech task for React Engineer for ${project}`,
      assignee: "DEV-001",
      type: "react-dev",
      payload: { goal: `Start engineering work for ${project}`, project }
    },
    {
      title: `Create UI brief for Design Director for ${project}`,
      assignee: "DES-001",
      type: "design",
      payload: { goal: `Design key screens for ${project}`, project }
    },
    {
      title: `Plan launch campaign for ${project}`,
      assignee: "MKT-001",
      type: "marketing",
      payload: { goal: `Prepare marketing rollout for ${project}`, project }
    },
    {
      title: `Map social media content plan for ${project}`,
      assignee: "SMM-001",
      type: "social-media",
      payload: { goal: `Develop social content calendar for ${project}`, project }
    },
    {
      title: `Coordinate embedded deployment for ${project}`,
      assignee: "EPD-001",
      type: "embedded-projects",
      payload: { goal: `Align embedded rollout with project goals`, project }
    }
  ];

  // Auto-post subtasks to hub
  const results = [];
  for (const sub of subtasks) {
    try {
      const res = await axios.post(`${HUB_URL}/tasks`, { ...sub, parentId: task.id });
      results.push({
        title: sub.title,
        assignee: sub.assignee,
        status: "created",
        id: res.data.id
      });
    } catch (err) {
      const reason = err?.response?.data?.error || err?.message || "unknown error";
      console.error(`Failed to create subtask for ${sub.assignee}:`, reason);
      results.push({ title: sub.title, assignee: sub.assignee, status: "error", error: reason });
    }
  }

  return {
    summary: `PM-001 created ${results.length} subtasks and pushed them to the hub.`,
    subtasks: results
  };
}
