export const routesApproveWorkflow = {
  module: "logistics/routes",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/routes record ${recordId}`;
  },
};
