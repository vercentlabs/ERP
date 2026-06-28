export const namingSeriesCloseWorkflow = {
  module: "platform/naming-series",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/naming-series record ${recordId}`;
  },
};
