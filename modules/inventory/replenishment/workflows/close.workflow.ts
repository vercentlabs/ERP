export const replenishmentCloseWorkflow = {
  module: "inventory/replenishment",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/replenishment record ${recordId}`;
  },
};
