export const contractsCancelWorkflow = {
  module: "subscriptions/contracts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/contracts record ${recordId}`;
  },
};
