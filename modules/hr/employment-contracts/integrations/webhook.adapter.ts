export const employmentContractsWebhookAdapter = {
  name: "hr/employment-contracts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employment-contracts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
