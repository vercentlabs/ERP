export const itemsRejectWorkflow = {
  module: "inventory/items",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/items record ${recordId}`;
  },
};
