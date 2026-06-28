export const commissionsCancelWorkflow = {
  module: "sales/commissions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/commissions record ${recordId}`;
  },
};
