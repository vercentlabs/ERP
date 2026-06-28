export const landedCostsSubmitWorkflow = {
  module: "procurement/landed-costs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/landed-costs record ${recordId}`;
  },
};
