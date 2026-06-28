export const deliveryNotesOutboundAdapter = {
  name: "sales/delivery-notes.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/delivery-notes",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
