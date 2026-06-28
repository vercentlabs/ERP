export const dockManagementRejectWorkflow = {
  module: "warehouse/dock-management",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/dock-management record ${recordId}`;
  },
};
