export const suppliersUpdateWorkflow = {
  module: "procurement/suppliers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/suppliers record ${recordId}`;
  },
};
