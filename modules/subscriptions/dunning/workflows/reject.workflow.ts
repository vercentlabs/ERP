export const dunningRejectWorkflow = {
  module: "subscriptions/dunning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/dunning record ${recordId}`;
  },
};
