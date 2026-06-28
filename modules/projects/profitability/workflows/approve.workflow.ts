export const profitabilityApproveWorkflow = {
  module: "projects/profitability",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/profitability record ${recordId}`;
  },
};
