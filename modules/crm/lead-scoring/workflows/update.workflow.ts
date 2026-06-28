export const leadScoringUpdateWorkflow = {
  module: "crm/lead-scoring",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/lead-scoring record ${recordId}`;
  },
};
