export const salesTargetsCreateWorkflow = {
  module: "sales/sales-targets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/sales-targets record ${recordId}`;
  },
};
