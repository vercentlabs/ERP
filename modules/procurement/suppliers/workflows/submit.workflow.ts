export const suppliersSubmitWorkflow = {
  module: "procurement/suppliers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/suppliers record ${recordId}`;
  },
};
