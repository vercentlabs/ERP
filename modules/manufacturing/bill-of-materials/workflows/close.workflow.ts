export const billOfMaterialsCloseWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
