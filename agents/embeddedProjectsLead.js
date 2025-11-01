// agents/embeddedProjectsLead.js

export async function handleEmbeddedProjectsLeadTask(task) {
  const { payload = {} } = task;
  const { project = "general", goal = "Integrate product with client systems" } = payload;

  return {
    summary: `EPD-001 prepared an embedded deployment plan for ${project}.`,
    todo: [
      `Review engineering scope to understand embedded requirements for ${project}`,
      `Draft integration checklist tailored to "${goal}"`,
      "Coordinate with client stakeholders on hardware/software constraints",
      "Outline pilot rollout, QA checkpoints, and support handoff"
    ]
  };
}
