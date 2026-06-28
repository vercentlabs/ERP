export const billOfMaterialsRejectWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
