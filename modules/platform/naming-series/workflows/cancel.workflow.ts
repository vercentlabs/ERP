export const namingSeriesCancelWorkflow = {
  module: "platform/naming-series",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/naming-series record ${recordId}`;
  },
};
