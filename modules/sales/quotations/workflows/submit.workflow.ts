export const quotationsSubmitWorkflow = {
  module: "sales/quotations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/quotations record ${recordId}`;
  },
};
