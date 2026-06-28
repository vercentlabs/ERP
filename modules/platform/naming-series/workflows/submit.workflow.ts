export const namingSeriesSubmitWorkflow = {
  module: "platform/naming-series",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/naming-series record ${recordId}`;
  },
};
