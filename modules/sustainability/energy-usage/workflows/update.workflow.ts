export const energyUsageUpdateWorkflow = {
  module: "sustainability/energy-usage",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/energy-usage record ${recordId}`;
  },
};
