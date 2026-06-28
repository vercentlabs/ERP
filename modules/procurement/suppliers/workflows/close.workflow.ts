export const suppliersCloseWorkflow = {
  module: "procurement/suppliers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/suppliers record ${recordId}`;
  },
};
