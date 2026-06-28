export const dataLakeInboundAdapter = {
  name: "data-platform/data-lake.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/data-lake",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
