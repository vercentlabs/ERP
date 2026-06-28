export const itemCategoriesSubmitWorkflow = {
  module: "inventory/item-categories",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/item-categories record ${recordId}`;
  },
};
