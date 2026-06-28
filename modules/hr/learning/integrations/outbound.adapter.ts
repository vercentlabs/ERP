export const learningOutboundAdapter = {
  name: "hr/learning.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/learning",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
