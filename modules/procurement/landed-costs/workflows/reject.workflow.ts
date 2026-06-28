export const landedCostsRejectWorkflow = {
  module: "procurement/landed-costs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/landed-costs record ${recordId}`;
  },
};
