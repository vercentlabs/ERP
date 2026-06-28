export const employeesWebhookAdapter = {
  name: "master-data/employees.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/employees",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
