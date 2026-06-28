export const supplierSustainabilityCreateWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
