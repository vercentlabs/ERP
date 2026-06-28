export const serviceContractsInboundAdapter = {
  name: "helpdesk/service-contracts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/service-contracts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
