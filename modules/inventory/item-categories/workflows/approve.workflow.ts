export const itemCategoriesApproveWorkflow = {
  module: "inventory/item-categories",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/item-categories record ${recordId}`;
  },
};
