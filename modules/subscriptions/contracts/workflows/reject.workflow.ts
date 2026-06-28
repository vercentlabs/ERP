export const contractsRejectWorkflow = {
  module: "subscriptions/contracts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/contracts record ${recordId}`;
  },
};
