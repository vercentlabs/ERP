export const itemsCloseWorkflow = {
  module: "inventory/items",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/items record ${recordId}`;
  },
};
