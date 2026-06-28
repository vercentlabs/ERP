export const renewalsUpdateWorkflow = {
  module: "subscriptions/renewals",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/renewals record ${recordId}`;
  },
};
