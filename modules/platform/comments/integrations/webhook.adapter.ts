export const commentsWebhookAdapter = {
  name: "platform/comments.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/comments",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
