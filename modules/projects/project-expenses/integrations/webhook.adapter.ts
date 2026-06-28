export const projectExpensesWebhookAdapter = {
  name: "projects/project-expenses.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/project-expenses",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
