export const servicePartsSubmitWorkflow = {
  module: "field-service/service-parts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/service-parts record ${recordId}`;
  },
};
