export const suppliersRejectWorkflow = {
  module: "master-data/suppliers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/suppliers record ${recordId}`;
  },
};
