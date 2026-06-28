export const salesTargetsSubmitWorkflow = {
  module: "sales/sales-targets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/sales-targets record ${recordId}`;
  },
};
