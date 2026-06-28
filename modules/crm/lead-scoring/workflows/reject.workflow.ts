export const leadScoringRejectWorkflow = {
  module: "crm/lead-scoring",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/lead-scoring record ${recordId}`;
  },
};
