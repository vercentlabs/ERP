export const plansCreateWorkflow = {
  module: "subscriptions/plans",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/plans record ${recordId}`;
  },
};
