export const eventStreamsWebhookAdapter = {
  name: "data-platform/event-streams.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/event-streams",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
