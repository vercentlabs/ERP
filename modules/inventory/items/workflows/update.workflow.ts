export const itemsUpdateWorkflow = {
  module: "inventory/items",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/items record ${recordId}`;
  },
};
