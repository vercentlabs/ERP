export const replenishmentTasksInboundAdapter = {
  name: "warehouse/replenishment-tasks.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/replenishment-tasks",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
