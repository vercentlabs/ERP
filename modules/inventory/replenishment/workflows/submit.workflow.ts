export const replenishmentSubmitWorkflow = {
  module: "inventory/replenishment",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/replenishment record ${recordId}`;
  },
};
