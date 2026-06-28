export const branchesOutboundAdapter = {
  name: "platform/branches.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/branches",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
