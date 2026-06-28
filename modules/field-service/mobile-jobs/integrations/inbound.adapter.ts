export const mobileJobsInboundAdapter = {
  name: "field-service/mobile-jobs.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/mobile-jobs",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
