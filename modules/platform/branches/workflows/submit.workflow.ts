export const branchesSubmitWorkflow = {
  module: "platform/branches",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/branches record ${recordId}`;
  },
};
