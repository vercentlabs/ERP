export const leadScoringCloseWorkflow = {
  module: "crm/lead-scoring",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/lead-scoring record ${recordId}`;
  },
};
