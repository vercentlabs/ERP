export const professionalServicesRejectWorkflow = {
  module: "industry-packs/professional-services",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/professional-services record ${recordId}`;
  },
};
