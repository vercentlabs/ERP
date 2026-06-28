export const servicePartsUpdateWorkflow = {
  module: "field-service/service-parts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/service-parts record ${recordId}`;
  },
};
