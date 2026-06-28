export const supplierSustainabilityUpdateWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
