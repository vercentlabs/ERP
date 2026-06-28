export const educationApproveWorkflow = {
  module: "industry-packs/education",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/education record ${recordId}`;
  },
};
