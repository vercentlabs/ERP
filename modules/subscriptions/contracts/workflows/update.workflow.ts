export const contractsUpdateWorkflow = {
  module: "subscriptions/contracts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/contracts record ${recordId}`;
  },
};
