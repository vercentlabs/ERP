export const dockManagementUpdateWorkflow = {
  module: "warehouse/dock-management",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/dock-management record ${recordId}`;
  },
};
