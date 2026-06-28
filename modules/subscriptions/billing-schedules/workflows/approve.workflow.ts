export const billingSchedulesApproveWorkflow = {
  module: "subscriptions/billing-schedules",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/billing-schedules record ${recordId}`;
  },
};
