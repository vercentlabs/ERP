export const billingSchedulesRejectWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
