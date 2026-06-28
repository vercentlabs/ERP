export const itemCategoriesUpdateWorkflow = {
  module: "inventory/item-categories",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/item-categories record ${recordId}`;
  },
};
