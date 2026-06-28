export const namingSeriesRejectWorkflow = {
  module: "platform/naming-series",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/naming-series record ${recordId}`;
  },
};
