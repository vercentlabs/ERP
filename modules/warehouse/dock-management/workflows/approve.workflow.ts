export const dockManagementApproveWorkflow = {
  module: "warehouse/dock-management",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/dock-management record ${recordId}`;
  },
};
