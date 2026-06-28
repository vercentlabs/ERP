export const supplierSustainabilityCloseWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
