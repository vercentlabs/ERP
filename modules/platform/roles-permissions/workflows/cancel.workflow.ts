export const rolesPermissionsCancelWorkflow = {
  module: "platform/roles-permissions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/roles-permissions record ${recordId}`;
  },
};
