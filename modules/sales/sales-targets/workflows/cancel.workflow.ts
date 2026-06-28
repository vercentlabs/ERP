export const salesTargetsCancelWorkflow = {
  module: "sales/sales-targets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/sales-targets record ${recordId}`;
  },
};
