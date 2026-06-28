export const namingSeriesUpdateWorkflow = {
  module: "platform/naming-series",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/naming-series record ${recordId}`;
  },
};
