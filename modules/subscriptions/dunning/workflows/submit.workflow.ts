export const dunningSubmitWorkflow = {
  module: "subscriptions/dunning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/dunning record ${recordId}`;
  },
};
