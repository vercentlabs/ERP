export const carriersApproveWorkflow = {
  module: "logistics/carriers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/carriers record ${recordId}`;
  },
};
