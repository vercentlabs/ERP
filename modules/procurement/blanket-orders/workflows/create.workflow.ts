export const blanketOrdersCreateWorkflow = {
  module: "procurement/blanket-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/blanket-orders record ${recordId}`;
  },
};
