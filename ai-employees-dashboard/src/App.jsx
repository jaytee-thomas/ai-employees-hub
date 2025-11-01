import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "project-management",
    assignee: "PM-001",
    project: "",
  });
  const [error, setError] = useState("");

  async function fetchTasks() {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load tasks from hub.");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE}/tasks`, {
        title: form.title,
        description: form.description,
        type: form.type,
        assignee: form.assignee,
        payload: {
          goal: form.description || "General task",
          project: form.project || form.title || "General",
        },
      });
      await fetchTasks();
      setForm({
        title: "",
        description: "",
        type: "project-management",
        assignee: "PM-001",
        project: "",
      });
    } catch (err) {
      console.error(err);
      setError("Could not create task.");
    } finally {
      setLoading(false);
    }
  }

  function renderTask(task, allTasks, level = 0) {
    const children = allTasks.filter((t) => t.parentId === task.id);
    const indent = { marginLeft: `${level * 25}px` };

    return (
      <div
        key={task.id}
        style={{
          border: "1px solid #eee",
          borderRadius: "8px",
          padding: "0.75rem",
          marginBottom: "0.75rem",
          ...indent
        }}
      >
        <h3 style={{ marginBottom: "0.25rem" }}>{task.title}</h3>
        <p style={{ margin: 0, color: "#555" }}>
          <strong>Status:</strong> {task.status} •{" "}
          <strong>Assignee:</strong> {task.assignee}
        </p>
        {task.result?.summary && (
          <p style={{ margin: "0.25rem 0" }}>{task.result.summary}</p>
        )}

        {children.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            {children.map((c) => renderTask(c, allTasks, level + 1))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>
          AI Employees – CEO Dashboard
        </h1>
        <p style={{ color: "#555" }}>
          You are <strong>CEO</strong>. Send tasks to PM-001, DEV-001, DES-001, MKT-001, SMM-001, EPD-001.
        </p>
      </header>

      <section
        style={{
          border: "1px solid #eee",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "2rem",
          background: "#fafafa",
        }}
      >
        <h2 style={{ marginBottom: "0.75rem" }}>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontWeight: 500 }}>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder='Plan work for Beechwood Films'
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px" }}
            />
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontWeight: 500 }}>
              Description / Goal
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder='Break this down for dev and design'
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                minHeight: "70px",
              }}
            />
          </div>

          <div
            style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}
          >
            <div>
              <label style={{ display: "block", fontWeight: 500 }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{ padding: "0.4rem", borderRadius: "6px" }}
              >
                <option value='project-management'>
                  Project Management (PM-001)
                </option>
                <option value='react-dev'>React Dev (DEV-001)</option>
                <option value='design'>Design (DES-001)</option>
                <option value='marketing'>Marketing (MKT-001)</option>
                <option value='social-media'>Social Media (SMM-001)</option>
                <option value='embedded-projects'>Embedded Projects (EPD-001)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 500 }}>
                Assignee
              </label>
              <select
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                style={{ padding: "0.4rem", borderRadius: "6px" }}
              >
                <option value='PM-001'>PM-001</option>
                <option value='DEV-001'>DEV-001</option>
                <option value='DES-001'>DES-001</option>
                <option value='MKT-001'>MKT-001</option>
                <option value='SMM-001'>SMM-001</option>
                <option value='EPD-001'>EPD-001</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontWeight: 500 }}>
                Project (optional)
              </label>
              <input
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                placeholder='Beechwood Films / i65 Sports'
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            style={{
              background: "#111827",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
          )}
        </form>
      </section>

      <section>
        <h2 style={{ marginBottom: "0.75rem" }}>Recent Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create your first one above 👆</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {tasks
              .filter((t) => !t.parentId)
              .map((t) => renderTask(t, tasks))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
