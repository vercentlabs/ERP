export const sparePartsInboundAdapter = {
  name: "maintenance/spare-parts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/spare-parts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
