export const billOfMaterialsCancelWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
