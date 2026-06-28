export const costCentersSubmitWorkflow = {
  module: "finance/cost-centers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/cost-centers record ${recordId}`;
  },
};
