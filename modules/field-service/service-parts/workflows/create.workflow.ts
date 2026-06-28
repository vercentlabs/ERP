export const servicePartsCreateWorkflow = {
  module: "field-service/service-parts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/service-parts record ${recordId}`;
  },
};
