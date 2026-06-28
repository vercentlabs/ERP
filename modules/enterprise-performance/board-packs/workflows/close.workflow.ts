export const boardPacksCloseWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
