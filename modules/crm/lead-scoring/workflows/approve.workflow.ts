export const leadScoringApproveWorkflow = {
  module: "crm/lead-scoring",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/lead-scoring record ${recordId}`;
  },
};
