export const professionalServicesSubmitWorkflow = {
  module: "industry-packs/professional-services",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/professional-services record ${recordId}`;
  },
};
