export const shipmentsUpdateWorkflow = {
  module: "logistics/shipments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/shipments record ${recordId}`;
  },
};
