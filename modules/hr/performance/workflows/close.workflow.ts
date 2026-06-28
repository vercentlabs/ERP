export const performanceCloseWorkflow = {
  module: "hr/performance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/performance record ${recordId}`;
  },
};
