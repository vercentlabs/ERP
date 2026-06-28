export const customerGroupsOutboundAdapter = {
  name: "commerce/customer-groups.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/customer-groups",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
