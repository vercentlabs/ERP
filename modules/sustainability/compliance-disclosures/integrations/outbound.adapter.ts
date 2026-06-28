export const complianceDisclosuresOutboundAdapter = {
  name: "sustainability/compliance-disclosures.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/compliance-disclosures",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
