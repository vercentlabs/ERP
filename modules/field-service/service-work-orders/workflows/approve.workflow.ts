export const serviceWorkOrdersApproveWorkflow = {
  module: "field-service/service-work-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/service-work-orders record ${recordId}`;
  },
};
