export const itemsCancelWorkflow = {
  module: "inventory/items",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/items record ${recordId}`;
  },
};
