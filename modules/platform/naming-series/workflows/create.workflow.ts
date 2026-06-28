export const namingSeriesCreateWorkflow = {
  module: "platform/naming-series",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/naming-series record ${recordId}`;
  },
};
