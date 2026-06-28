export const softwareSaasCreateWorkflow = {
  module: "industry-packs/software-saas",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/software-saas record ${recordId}`;
  },
};
