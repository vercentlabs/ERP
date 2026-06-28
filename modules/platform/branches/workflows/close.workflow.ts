export const branchesCloseWorkflow = {
  module: "platform/branches",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/branches record ${recordId}`;
  },
};
