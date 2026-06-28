export const chartMasterOutboundAdapter = {
  name: "master-data/chart-master.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/chart-master",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
