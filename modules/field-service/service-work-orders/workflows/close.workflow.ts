export const serviceWorkOrdersCloseWorkflow = {
  module: "field-service/service-work-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/service-work-orders record ${recordId}`;
  },
};
