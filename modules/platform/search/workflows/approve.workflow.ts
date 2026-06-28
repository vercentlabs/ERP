export const searchApproveWorkflow = {
  module: "platform/search",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/search record ${recordId}`;
  },
};
