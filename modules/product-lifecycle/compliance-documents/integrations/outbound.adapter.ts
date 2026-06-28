export const complianceDocumentsOutboundAdapter = {
  name: "product-lifecycle/compliance-documents.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/compliance-documents",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
