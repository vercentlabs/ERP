export const commissionsSubmitWorkflow = {
  module: "sales/commissions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/commissions record ${recordId}`;
  },
};
