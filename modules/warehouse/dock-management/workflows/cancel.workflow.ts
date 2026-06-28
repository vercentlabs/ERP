export const dockManagementCancelWorkflow = {
  module: "warehouse/dock-management",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/dock-management record ${recordId}`;
  },
};
