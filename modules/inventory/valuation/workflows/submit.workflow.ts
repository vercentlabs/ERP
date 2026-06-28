export const valuationSubmitWorkflow = {
  module: "inventory/valuation",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/valuation record ${recordId}`;
  },
};
