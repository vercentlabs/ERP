export const unitsOfMeasureInboundAdapter = {
  name: "inventory/units-of-measure.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/units-of-measure",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
