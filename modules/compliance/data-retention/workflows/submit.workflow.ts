export const dataRetentionSubmitWorkflow = {
  module: "compliance/data-retention",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/data-retention record ${recordId}`;
  },
};
