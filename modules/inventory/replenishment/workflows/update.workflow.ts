export const replenishmentUpdateWorkflow = {
  module: "inventory/replenishment",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/replenishment record ${recordId}`;
  },
};
