export const customerGroupsInboundAdapter = {
  name: "commerce/customer-groups.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/customer-groups",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
