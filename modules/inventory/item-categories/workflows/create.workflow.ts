export const itemCategoriesCreateWorkflow = {
  module: "inventory/item-categories",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/item-categories record ${recordId}`;
  },
};
