export const energyUsageCreateWorkflow = {
  module: "sustainability/energy-usage",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/energy-usage record ${recordId}`;
  },
};
