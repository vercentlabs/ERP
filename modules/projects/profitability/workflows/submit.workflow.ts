export const profitabilitySubmitWorkflow = {
  module: "projects/profitability",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/profitability record ${recordId}`;
  },
};
