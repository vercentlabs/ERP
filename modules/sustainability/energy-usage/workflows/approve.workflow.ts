export const energyUsageApproveWorkflow = {
  module: "sustainability/energy-usage",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/energy-usage record ${recordId}`;
  },
};
