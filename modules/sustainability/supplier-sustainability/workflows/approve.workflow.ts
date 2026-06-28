export const supplierSustainabilityApproveWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
