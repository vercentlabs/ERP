export const dataLakeUpdateWorkflow = {
  module: "data-platform/data-lake",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/data-lake record ${recordId}`;
  },
};
