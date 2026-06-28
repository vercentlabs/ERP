export const supplierSustainabilityRejectWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
