export const dataLakeRejectWorkflow = {
  module: "data-platform/data-lake",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/data-lake record ${recordId}`;
  },
};
