export const dataRetentionCloseWorkflow = {
  module: "compliance/data-retention",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/data-retention record ${recordId}`;
  },
};
