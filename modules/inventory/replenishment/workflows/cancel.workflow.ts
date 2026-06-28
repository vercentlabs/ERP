export const replenishmentCancelWorkflow = {
  module: "inventory/replenishment",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/replenishment record ${recordId}`;
  },
};
