export const qualityInspectionsInboundAdapter = {
  name: "quality/quality-inspections.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-inspections",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
