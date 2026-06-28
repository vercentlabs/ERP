export const replenishmentApproveWorkflow = {
  module: "inventory/replenishment",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/replenishment record ${recordId}`;
  },
};
