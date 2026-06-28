export const renewalsSubmitWorkflow = {
  module: "subscriptions/renewals",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/renewals record ${recordId}`;
  },
};
