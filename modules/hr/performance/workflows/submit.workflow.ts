export const performanceSubmitWorkflow = {
  module: "hr/performance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/performance record ${recordId}`;
  },
};
