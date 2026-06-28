export const professionalServicesUpdateWorkflow = {
  module: "industry-packs/professional-services",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/professional-services record ${recordId}`;
  },
};
