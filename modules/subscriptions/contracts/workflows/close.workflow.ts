export const contractsCloseWorkflow = {
  module: "subscriptions/contracts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/contracts record ${recordId}`;
  },
};
