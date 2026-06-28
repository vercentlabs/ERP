export const dataLakeCloseWorkflow = {
  module: "data-platform/data-lake",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/data-lake record ${recordId}`;
  },
};
