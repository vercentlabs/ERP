export const billOfMaterialsSubmitWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
