export const professionalServicesApproveWorkflow = {
  module: "industry-packs/professional-services",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/professional-services record ${recordId}`;
  },
};
