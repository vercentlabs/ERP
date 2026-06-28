export const mobileJobsCancelWorkflow = {
  module: "field-service/mobile-jobs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/mobile-jobs record ${recordId}`;
  },
};
