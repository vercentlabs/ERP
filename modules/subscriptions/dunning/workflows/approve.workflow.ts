export const dunningApproveWorkflow = {
  module: "subscriptions/dunning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/dunning record ${recordId}`;
  },
};
