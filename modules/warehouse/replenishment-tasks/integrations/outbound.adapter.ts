export const replenishmentTasksOutboundAdapter = {
  name: "warehouse/replenishment-tasks.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/replenishment-tasks",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
