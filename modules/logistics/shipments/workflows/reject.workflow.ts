export const shipmentsRejectWorkflow = {
  module: "logistics/shipments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/shipments record ${recordId}`;
  },
};
