export const healthcareRejectWorkflow = {
  module: "industry-packs/healthcare",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/healthcare record ${recordId}`;
  },
};
