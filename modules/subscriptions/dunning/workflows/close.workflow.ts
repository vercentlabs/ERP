export const dunningCloseWorkflow = {
  module: "subscriptions/dunning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/dunning record ${recordId}`;
  },
};
