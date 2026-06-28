export const dockManagementSubmitWorkflow = {
  module: "warehouse/dock-management",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/dock-management record ${recordId}`;
  },
};
