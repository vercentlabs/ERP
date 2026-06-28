export const downtimeInboundAdapter = {
  name: "maintenance/downtime.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/downtime",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
