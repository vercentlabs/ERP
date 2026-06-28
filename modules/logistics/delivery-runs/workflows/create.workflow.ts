export const deliveryRunsCreateWorkflow = {
  module: "logistics/delivery-runs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/delivery-runs record ${recordId}`;
  },
};
