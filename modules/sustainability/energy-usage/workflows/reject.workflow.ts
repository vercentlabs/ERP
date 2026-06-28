export const energyUsageRejectWorkflow = {
  module: "sustainability/energy-usage",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/energy-usage record ${recordId}`;
  },
};
