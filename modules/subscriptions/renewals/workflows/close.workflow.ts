export const renewalsCloseWorkflow = {
  module: "subscriptions/renewals",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/renewals record ${recordId}`;
  },
};
