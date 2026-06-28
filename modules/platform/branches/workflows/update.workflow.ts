export const branchesUpdateWorkflow = {
  module: "platform/branches",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/branches record ${recordId}`;
  },
};
