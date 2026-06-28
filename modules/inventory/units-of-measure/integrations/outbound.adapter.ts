export const unitsOfMeasureOutboundAdapter = {
  name: "inventory/units-of-measure.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/units-of-measure",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
