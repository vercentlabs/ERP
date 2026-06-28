export const segmentsInboundAdapter = {
  name: "crm/segments.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/segments",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
