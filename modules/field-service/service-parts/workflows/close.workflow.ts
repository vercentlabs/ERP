export const servicePartsCloseWorkflow = {
  module: "field-service/service-parts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/service-parts record ${recordId}`;
  },
};
