export const softwareSaasUpdateWorkflow = {
  module: "industry-packs/software-saas",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/software-saas record ${recordId}`;
  },
};
