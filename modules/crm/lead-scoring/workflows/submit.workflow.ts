export const leadScoringSubmitWorkflow = {
  module: "crm/lead-scoring",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/lead-scoring record ${recordId}`;
  },
};
