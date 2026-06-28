export const shipmentsCloseWorkflow = {
  module: "logistics/shipments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/shipments record ${recordId}`;
  },
};
