export const quotationsCreateWorkflow = {
  module: "sales/quotations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/quotations record ${recordId}`;
  },
};
