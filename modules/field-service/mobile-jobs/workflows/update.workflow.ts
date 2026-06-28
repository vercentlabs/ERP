export const mobileJobsUpdateWorkflow = {
  module: "field-service/mobile-jobs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
