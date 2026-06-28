export const plansCloseWorkflow = {
  module: "subscriptions/plans",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/plans record ${recordId}`;
  },
};
