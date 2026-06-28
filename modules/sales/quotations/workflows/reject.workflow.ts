export const quotationsRejectWorkflow = {
  module: "sales/quotations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/quotations record ${recordId}`;
  },
};
