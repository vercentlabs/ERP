export const boardPacksSubmitWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
