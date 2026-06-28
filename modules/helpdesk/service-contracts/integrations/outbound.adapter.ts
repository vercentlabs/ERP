export const serviceContractsOutboundAdapter = {
  name: "helpdesk/service-contracts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/service-contracts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
