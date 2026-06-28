export const cdcApproveWorkflow = {
  module: "data-platform/cdc",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/cdc record ${recordId}`;
  },
};
