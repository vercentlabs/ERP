export const billingSchedulesCancelWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
