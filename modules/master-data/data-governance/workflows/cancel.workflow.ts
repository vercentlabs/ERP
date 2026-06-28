export const dataGovernanceCancelWorkflow = {
  module: "master-data/data-governance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/data-governance record ${recordId}`;
  },
};
