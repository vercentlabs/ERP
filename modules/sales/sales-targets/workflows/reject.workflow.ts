export const salesTargetsRejectWorkflow = {
  module: "sales/sales-targets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/sales-targets record ${recordId}`;
  },
};
