export const mobileJobsRejectWorkflow = {
  module: "field-service/mobile-jobs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
