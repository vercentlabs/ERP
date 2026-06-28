export const statutoryReportsApproveWorkflow = {
  module: "compliance/statutory-reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/statutory-reports record ${recordId}`;
  },
};
