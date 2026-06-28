export const suppliersSubmitWorkflow = {
  module: "master-data/suppliers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/suppliers record ${recordId}`;
  },
};
