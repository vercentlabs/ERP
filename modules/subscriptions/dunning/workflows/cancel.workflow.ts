export const dunningCancelWorkflow = {
  module: "subscriptions/dunning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/dunning record ${recordId}`;
  },
};
