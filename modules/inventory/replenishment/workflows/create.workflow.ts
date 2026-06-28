export const replenishmentCreateWorkflow = {
  module: "inventory/replenishment",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/replenishment record ${recordId}`;
  },
};
