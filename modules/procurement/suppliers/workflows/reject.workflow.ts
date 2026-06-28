export const suppliersRejectWorkflow = {
  module: "procurement/suppliers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/suppliers record ${recordId}`;
  },
};
