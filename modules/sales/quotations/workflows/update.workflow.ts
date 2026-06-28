export const quotationsUpdateWorkflow = {
  module: "sales/quotations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/quotations record ${recordId}`;
  },
};
