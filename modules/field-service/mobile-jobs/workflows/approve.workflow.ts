export const mobileJobsApproveWorkflow = {
  module: "field-service/mobile-jobs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
