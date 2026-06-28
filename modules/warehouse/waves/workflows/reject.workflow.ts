export const wavesRejectWorkflow = {
  module: "warehouse/waves",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/waves record ${recordId}`;
  },
};
