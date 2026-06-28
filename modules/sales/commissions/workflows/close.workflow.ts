export const commissionsCloseWorkflow = {
  module: "sales/commissions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/commissions record ${recordId}`;
  },
};
