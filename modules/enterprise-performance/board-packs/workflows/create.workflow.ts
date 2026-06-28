export const boardPacksCreateWorkflow = {
  module: "enterprise-performance/board-packs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/board-packs record ${recordId}`;
  },
};
