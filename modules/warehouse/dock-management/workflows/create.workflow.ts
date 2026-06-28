export const dockManagementCreateWorkflow = {
  module: "warehouse/dock-management",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/dock-management record ${recordId}`;
  },
};
