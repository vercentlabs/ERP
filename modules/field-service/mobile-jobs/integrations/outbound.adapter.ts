export const mobileJobsOutboundAdapter = {
  name: "field-service/mobile-jobs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/mobile-jobs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
