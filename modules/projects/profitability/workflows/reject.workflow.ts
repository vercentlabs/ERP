export const profitabilityRejectWorkflow = {
  module: "projects/profitability",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/profitability record ${recordId}`;
  },
};
