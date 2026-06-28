export const boardPacksRejectWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
