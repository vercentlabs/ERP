export const replenishmentRejectWorkflow = {
  module: "inventory/replenishment",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/replenishment record ${recordId}`;
  },
};
