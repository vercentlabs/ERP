export const complianceDisclosuresInboundAdapter = {
  name: "sustainability/compliance-disclosures.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/compliance-disclosures",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
