export const customersOutboundAdapter = {
  name: "master-data/customers.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/customers",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
