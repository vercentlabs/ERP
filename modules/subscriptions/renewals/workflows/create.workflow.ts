export const renewalsCreateWorkflow = {
  module: "subscriptions/renewals",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/renewals record ${recordId}`;
  },
};
