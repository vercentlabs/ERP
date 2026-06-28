export const sparePartsOutboundAdapter = {
  name: "maintenance/spare-parts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/spare-parts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
