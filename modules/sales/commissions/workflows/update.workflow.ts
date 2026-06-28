export const commissionsUpdateWorkflow = {
  module: "sales/commissions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/commissions record ${recordId}`;
  },
};
