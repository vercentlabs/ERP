export const deliveryRunsSubmitWorkflow = {
  module: "logistics/delivery-runs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/delivery-runs record ${recordId}`;
  },
};
