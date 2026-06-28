export const dataLakeSubmitWorkflow = {
  module: "data-platform/data-lake",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/data-lake record ${recordId}`;
  },
};
