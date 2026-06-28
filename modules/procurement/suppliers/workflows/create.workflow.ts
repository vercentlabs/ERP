export const suppliersCreateWorkflow = {
  module: "procurement/suppliers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/suppliers record ${recordId}`;
  },
};
