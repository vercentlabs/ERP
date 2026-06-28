export const serviceWorkOrdersSubmitWorkflow = {
  module: "field-service/service-work-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/service-work-orders record ${recordId}`;
  },
};
