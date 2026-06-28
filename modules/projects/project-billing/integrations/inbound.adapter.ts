export const projectBillingInboundAdapter = {
  name: "projects/project-billing.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/project-billing",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
