export const cdcCloseWorkflow = {
  module: "data-platform/cdc",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/cdc record ${recordId}`;
  },
};
