export const professionalServicesCreateWorkflow = {
  module: "industry-packs/professional-services",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/professional-services record ${recordId}`;
  },
};
