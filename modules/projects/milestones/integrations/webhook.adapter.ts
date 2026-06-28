export const milestonesWebhookAdapter = {
  name: "projects/milestones.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/milestones",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
