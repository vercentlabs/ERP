export const dockManagementCloseWorkflow = {
  module: "warehouse/dock-management",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/dock-management record ${recordId}`;
  },
};
