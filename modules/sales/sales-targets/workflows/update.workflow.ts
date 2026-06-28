export const salesTargetsUpdateWorkflow = {
  module: "sales/sales-targets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/sales-targets record ${recordId}`;
  },
};
