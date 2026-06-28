export const serviceWorkOrdersUpdateWorkflow = {
  module: "field-service/service-work-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/service-work-orders record ${recordId}`;
  },
};
