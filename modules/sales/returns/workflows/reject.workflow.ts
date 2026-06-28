export const returnsRejectWorkflow = {
  module: "sales/returns",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/returns record ${recordId}`;
  },
};
