export const leadScoringCreateWorkflow = {
  module: "crm/lead-scoring",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/lead-scoring record ${recordId}`;
  },
};
