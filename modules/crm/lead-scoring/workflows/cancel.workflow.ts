export const leadScoringCancelWorkflow = {
  module: "crm/lead-scoring",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/lead-scoring record ${recordId}`;
  },
};
