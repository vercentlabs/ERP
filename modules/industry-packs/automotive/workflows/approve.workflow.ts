export const automotiveApproveWorkflow = {
  module: "industry-packs/automotive",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/automotive record ${recordId}`;
  },
};
