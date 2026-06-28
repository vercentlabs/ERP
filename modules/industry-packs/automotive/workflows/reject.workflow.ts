export const automotiveRejectWorkflow = {
  module: "industry-packs/automotive",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/automotive record ${recordId}`;
  },
};
