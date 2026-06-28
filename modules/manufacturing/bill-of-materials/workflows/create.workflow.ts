export const billOfMaterialsCreateWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
