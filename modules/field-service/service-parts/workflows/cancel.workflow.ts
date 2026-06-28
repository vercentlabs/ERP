export const servicePartsCancelWorkflow = {
  module: "field-service/service-parts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/service-parts record ${recordId}`;
  },
};
