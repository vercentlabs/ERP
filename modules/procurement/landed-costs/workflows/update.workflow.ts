export const landedCostsUpdateWorkflow = {
  module: "procurement/landed-costs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/landed-costs record ${recordId}`;
  },
};
