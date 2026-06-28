export const itemCategoriesInboundAdapter = {
  name: "inventory/item-categories.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/item-categories",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
