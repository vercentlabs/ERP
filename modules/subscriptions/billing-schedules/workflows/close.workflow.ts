export const billingSchedulesCloseWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
