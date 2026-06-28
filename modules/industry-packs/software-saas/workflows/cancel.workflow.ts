export const softwareSaasCancelWorkflow = {
  module: "industry-packs/software-saas",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/software-saas record ${recordId}`;
  },
};
