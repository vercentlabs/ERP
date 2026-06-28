export const professionalServicesCancelWorkflow = {
  module: "industry-packs/professional-services",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/professional-services record ${recordId}`;
  },
};
