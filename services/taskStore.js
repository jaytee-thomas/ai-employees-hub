// services/taskStore.js
const tasks = new Map(); // id -> task

export function createTask(task) {
  tasks.set(task.id, task);
  return task;
}

export function updateTask(id, updates) {
  const existing = tasks.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  tasks.set(id, updated);
  return updated;
}

export function getTask(id) {
  return tasks.get(id) || null;
}

export function getAllTasks() {
  return Array.from(tasks.values()).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// NEW ➜ get children of a parent task
export function getChildTasks(parentId) {
  return Array.from(tasks.values()).filter(t => t.parentId === parentId);
}