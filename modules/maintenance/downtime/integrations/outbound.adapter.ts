export const downtimeOutboundAdapter = {
  name: "maintenance/downtime.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/downtime",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
