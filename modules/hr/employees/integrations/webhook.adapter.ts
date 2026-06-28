export const employeesWebhookAdapter = {
  name: "hr/employees.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employees",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
