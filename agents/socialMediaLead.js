// agents/socialMediaLead.js

export async function handleSocialMediaLeadTask(task) {
  const { payload = {} } = task;
  const { project = "general", goal = "Increase awareness" } = payload;

  return {
    summary: `SMM-001 drafted a social media playbook for ${project}.`,
    todo: [
      `Outline primary story arcs supporting "${goal}"`,
      "Draft platform-specific messaging (IG, TikTok, LinkedIn)",
      "Assemble asset needs (graphics, video snippets, copy)",
      "Schedule content cadence and community responses"
    ]
  };
}
