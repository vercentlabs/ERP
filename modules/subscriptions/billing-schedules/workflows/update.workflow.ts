export const billingSchedulesUpdateWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
