export const complianceDocumentsInboundAdapter = {
  name: "product-lifecycle/compliance-documents.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/compliance-documents",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
