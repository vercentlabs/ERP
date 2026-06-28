export const professionalServicesCloseWorkflow = {
  module: "industry-packs/professional-services",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/professional-services record ${recordId}`;
  },
};
