export const educationRejectWorkflow = {
  module: "industry-packs/education",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/education record ${recordId}`;
  },
};
