export const softwareSaasSubmitWorkflow = {
  module: "industry-packs/software-saas",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/software-saas record ${recordId}`;
  },
};
