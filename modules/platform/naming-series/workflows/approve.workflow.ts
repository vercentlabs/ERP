export const namingSeriesApproveWorkflow = {
  module: "platform/naming-series",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/naming-series record ${recordId}`;
  },
};
