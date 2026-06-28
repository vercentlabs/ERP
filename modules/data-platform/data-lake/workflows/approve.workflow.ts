export const dataLakeApproveWorkflow = {
  module: "data-platform/data-lake",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/data-lake record ${recordId}`;
  },
};
