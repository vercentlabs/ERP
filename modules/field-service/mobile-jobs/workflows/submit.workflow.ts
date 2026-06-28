export const mobileJobsSubmitWorkflow = {
  module: "field-service/mobile-jobs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
