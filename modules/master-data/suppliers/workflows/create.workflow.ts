export const suppliersCreateWorkflow = {
  module: "master-data/suppliers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/suppliers record ${recordId}`;
  },
};
