export const dataMartsApproveWorkflow = {
  module: "analytics/data-marts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/data-marts record ${recordId}`;
  },
};
