export const softwareSaasCloseWorkflow = {
  module: "industry-packs/software-saas",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/software-saas record ${recordId}`;
  },
};
