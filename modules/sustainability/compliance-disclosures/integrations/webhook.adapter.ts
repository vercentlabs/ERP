export const complianceDisclosuresWebhookAdapter = {
  name: "sustainability/compliance-disclosures.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/compliance-disclosures",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
