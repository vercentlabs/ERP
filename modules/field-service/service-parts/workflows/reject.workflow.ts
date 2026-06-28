export const servicePartsRejectWorkflow = {
  module: "field-service/service-parts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/service-parts record ${recordId}`;
  },
};
