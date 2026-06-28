export const boardPacksUpdateWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
