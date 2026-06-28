export const boardPacksApproveWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
