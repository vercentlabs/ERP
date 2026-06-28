export const profitabilityUpdateWorkflow = {
  module: "projects/profitability",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/profitability record ${recordId}`;
  },
};
