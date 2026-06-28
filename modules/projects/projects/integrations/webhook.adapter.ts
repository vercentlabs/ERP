export const projectsWebhookAdapter = {
  name: "projects/projects.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/projects",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
