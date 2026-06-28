export const quotationsCloseWorkflow = {
  module: "sales/quotations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/quotations record ${recordId}`;
  },
};
