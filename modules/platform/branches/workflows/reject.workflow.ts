export const branchesRejectWorkflow = {
  module: "platform/branches",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/branches record ${recordId}`;
  },
};
