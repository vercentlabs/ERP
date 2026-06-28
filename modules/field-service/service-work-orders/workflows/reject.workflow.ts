export const serviceWorkOrdersRejectWorkflow = {
  module: "field-service/service-work-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/service-work-orders record ${recordId}`;
  },
};
