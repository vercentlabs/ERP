export const commentsOutboundAdapter = {
  name: "platform/comments.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/comments",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
