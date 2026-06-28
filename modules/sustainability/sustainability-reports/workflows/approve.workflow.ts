export const sustainabilityReportsApproveWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
