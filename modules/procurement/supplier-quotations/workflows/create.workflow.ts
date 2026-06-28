export const supplierQuotationsCreateWorkflow = {
  module: "procurement/supplier-quotations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
