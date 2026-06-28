export const shipmentsCreateWorkflow = {
  module: "logistics/shipments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/shipments record ${recordId}`;
  },
};
