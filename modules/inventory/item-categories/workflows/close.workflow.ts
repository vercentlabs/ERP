export const itemCategoriesCloseWorkflow = {
  module: "inventory/item-categories",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/item-categories record ${recordId}`;
  },
};
