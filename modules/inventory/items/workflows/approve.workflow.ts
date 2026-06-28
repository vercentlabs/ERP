export const itemsApproveWorkflow = {
  module: "inventory/items",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/items record ${recordId}`;
  },
};
