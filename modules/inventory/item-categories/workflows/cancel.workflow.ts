export const itemCategoriesCancelWorkflow = {
  module: "inventory/item-categories",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/item-categories record ${recordId}`;
  },
};
