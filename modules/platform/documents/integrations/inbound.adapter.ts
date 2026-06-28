export const documentsInboundAdapter = {
  name: "platform/documents.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/documents",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
