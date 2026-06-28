export const serviceWorkOrdersCancelWorkflow = {
  module: "field-service/service-work-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/service-work-orders record ${recordId}`;
  },
};
