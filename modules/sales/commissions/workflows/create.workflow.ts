export const commissionsCreateWorkflow = {
  module: "sales/commissions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/commissions record ${recordId}`;
  },
};
