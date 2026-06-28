export const billOfMaterialsUpdateWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
