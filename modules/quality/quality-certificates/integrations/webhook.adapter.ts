export const qualityCertificatesWebhookAdapter = {
  name: "quality/quality-certificates.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-certificates",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
