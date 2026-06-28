export const cdcSubmitWorkflow = {
  module: "data-platform/cdc",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/cdc record ${recordId}`;
  },
};
