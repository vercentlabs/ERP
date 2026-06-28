export const servicePartsApproveWorkflow = {
  module: "field-service/service-parts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/service-parts record ${recordId}`;
  },
};
