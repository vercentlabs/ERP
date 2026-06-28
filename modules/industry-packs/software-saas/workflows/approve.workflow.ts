export const softwareSaasApproveWorkflow = {
  module: "industry-packs/software-saas",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/software-saas record ${recordId}`;
  },
};
