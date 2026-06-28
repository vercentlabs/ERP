export const nonConformanceInboundAdapter = {
  name: "quality/non-conformance.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/non-conformance",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
