export const apparelRejectWorkflow = {
  module: "industry-packs/apparel",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/apparel record ${recordId}`;
  },
};
