export const suppliersUpdateWorkflow = {
  module: "master-data/suppliers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/suppliers record ${recordId}`;
  },
};
