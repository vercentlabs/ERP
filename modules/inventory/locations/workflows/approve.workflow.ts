export const locationsApproveWorkflow = {
  module: "inventory/locations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/locations record ${recordId}`;
  },
};
