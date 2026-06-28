export const dunningUpdateWorkflow = {
  module: "subscriptions/dunning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/dunning record ${recordId}`;
  },
};
