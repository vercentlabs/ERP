export const returnsRepairsWebhookAdapter = {
  name: "helpdesk/returns-repairs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/returns-repairs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
