export const supplierSustainabilitySubmitWorkflow = {
  module: "sustainability/supplier-sustainability",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/supplier-sustainability record ${recordId}`;
  },
};
