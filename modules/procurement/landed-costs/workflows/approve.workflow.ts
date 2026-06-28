export const landedCostsApproveWorkflow = {
  module: "procurement/landed-costs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/landed-costs record ${recordId}`;
  },
};
