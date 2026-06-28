export const recruitmentWebhookAdapter = {
  name: "hr/recruitment.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/recruitment",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
