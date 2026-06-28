export const mobileJobsCreateWorkflow = {
  module: "field-service/mobile-jobs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
