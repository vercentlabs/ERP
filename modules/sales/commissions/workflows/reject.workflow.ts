export const commissionsRejectWorkflow = {
  module: "sales/commissions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/commissions record ${recordId}`;
  },
};
