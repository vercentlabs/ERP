export const itemsApproveWorkflow = {
  module: "master-data/items",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/items record ${recordId}`;
  },
};
