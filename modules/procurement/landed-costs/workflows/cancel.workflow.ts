export const landedCostsCancelWorkflow = {
  module: "procurement/landed-costs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/landed-costs record ${recordId}`;
  },
};
