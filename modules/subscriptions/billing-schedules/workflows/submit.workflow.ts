export const billingSchedulesSubmitWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
