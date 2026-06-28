export const healthcareApproveWorkflow = {
  module: "industry-packs/healthcare",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/healthcare record ${recordId}`;
  },
};
