export const serviceWorkOrdersCreateWorkflow = {
  module: "field-service/service-work-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/service-work-orders record ${recordId}`;
  },
};
