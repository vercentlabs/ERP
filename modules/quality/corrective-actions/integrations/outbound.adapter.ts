export const correctiveActionsOutboundAdapter = {
  name: "quality/corrective-actions.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/corrective-actions",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
