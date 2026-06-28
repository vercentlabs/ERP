export const itemsSubmitWorkflow = {
  module: "inventory/items",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/items record ${recordId}`;
  },
};
