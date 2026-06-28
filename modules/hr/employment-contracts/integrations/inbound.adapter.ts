export const employmentContractsInboundAdapter = {
  name: "hr/employment-contracts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employment-contracts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
