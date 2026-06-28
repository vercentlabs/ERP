export const energyUsageCloseWorkflow = {
  module: "sustainability/energy-usage",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/energy-usage record ${recordId}`;
  },
};
