export const dunningCreateWorkflow = {
  module: "subscriptions/dunning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/dunning record ${recordId}`;
  },
};
