export const cdcRejectWorkflow = {
  module: "data-platform/cdc",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/cdc record ${recordId}`;
  },
};
