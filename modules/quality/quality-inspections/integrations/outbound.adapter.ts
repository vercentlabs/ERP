export const qualityInspectionsOutboundAdapter = {
  name: "quality/quality-inspections.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-inspections",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
