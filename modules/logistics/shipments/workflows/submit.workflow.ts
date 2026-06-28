export const shipmentsSubmitWorkflow = {
  module: "logistics/shipments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/shipments record ${recordId}`;
  },
};
