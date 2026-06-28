export const softwareSaasRejectWorkflow = {
  module: "industry-packs/software-saas",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/software-saas record ${recordId}`;
  },
};
