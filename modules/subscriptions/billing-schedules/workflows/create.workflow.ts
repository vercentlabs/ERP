export const billingSchedulesCreateWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
