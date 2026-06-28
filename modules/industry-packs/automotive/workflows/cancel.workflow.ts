export const automotiveCancelWorkflow = {
  module: "industry-packs/automotive",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/automotive record ${recordId}`;
  },
};
