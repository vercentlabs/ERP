export const energyUsageSubmitWorkflow = {
  module: "sustainability/energy-usage",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/energy-usage record ${recordId}`;
  },
};
