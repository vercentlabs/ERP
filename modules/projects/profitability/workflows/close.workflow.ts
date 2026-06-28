export const profitabilityCloseWorkflow = {
  module: "projects/profitability",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/profitability record ${recordId}`;
  },
};
