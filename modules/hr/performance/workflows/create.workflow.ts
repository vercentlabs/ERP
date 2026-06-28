export const performanceCreateWorkflow = {
  module: "hr/performance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/performance record ${recordId}`;
  },
};
