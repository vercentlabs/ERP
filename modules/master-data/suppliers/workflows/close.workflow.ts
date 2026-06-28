export const suppliersCloseWorkflow = {
  module: "master-data/suppliers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/suppliers record ${recordId}`;
  },
};
