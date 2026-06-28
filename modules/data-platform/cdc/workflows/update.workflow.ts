export const cdcUpdateWorkflow = {
  module: "data-platform/cdc",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/cdc record ${recordId}`;
  },
};
