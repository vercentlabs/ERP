export const mobileJobsCloseWorkflow = {
  module: "field-service/mobile-jobs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
