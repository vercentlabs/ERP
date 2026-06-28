export const plansSubmitWorkflow = {
  module: "subscriptions/plans",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/plans record ${recordId}`;
  },
};
