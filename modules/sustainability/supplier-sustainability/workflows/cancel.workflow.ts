export const supplierSustainabilityCancelWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
