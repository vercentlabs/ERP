export const boardPacksCancelWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
