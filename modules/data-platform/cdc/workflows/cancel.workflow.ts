export const cdcCancelWorkflow = {
  module: "data-platform/cdc",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/cdc record ${recordId}`;
  },
};
