// services/router.js
import { handleProjectManagerTask } from "../agents/projectManager.js";
import { handleReactEngineerTask } from "../agents/reactEngineer.js";
import { handleDesignDirectorTask } from "../agents/designDirector.js";
import { handleMarketingDirectorTask } from "../agents/marketingDirector.js";
import { handleSocialMediaLeadTask } from "../agents/socialMediaLead.js";
import { handleEmbeddedProjectsLeadTask } from "../agents/embeddedProjectsLead.js";

export async function routeTask(task) {
  if (task.assignee === "PM-001" || task.type === "project-management") {
    return await handleProjectManagerTask(task);
  }

  if (task.assignee === "DEV-001" || task.type === "react-dev") {
    return await handleReactEngineerTask(task);
  }

  if (task.assignee === "DES-001" || task.type === "design") {
    return await handleDesignDirectorTask(task);
  }

  if (task.assignee === "MKT-001" || task.type === "marketing") {
    return await handleMarketingDirectorTask(task);
  }

  if (task.assignee === "SMM-001" || task.type === "social-media") {
    return await handleSocialMediaLeadTask(task);
  }

  if (task.assignee === "EPD-001" || task.type === "embedded-projects") {
    return await handleEmbeddedProjectsLeadTask(task);
  }

  return {
    summary: "No matching AI employee. Please specify assignee or type.",
    error: true
  };
}
