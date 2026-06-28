export const itemCategoriesRejectWorkflow = {
  module: "inventory/item-categories",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/item-categories record ${recordId}`;
  },
};
