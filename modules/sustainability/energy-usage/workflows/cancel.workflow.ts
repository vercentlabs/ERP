export const energyUsageCancelWorkflow = {
  module: "sustainability/energy-usage",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/energy-usage record ${recordId}`;
  },
};
