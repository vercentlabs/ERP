export const supplierQuotationsSubmitWorkflow = {
  module: "procurement/supplier-quotations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
