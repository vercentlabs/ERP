export const rolesPermissionsUpdateWorkflow = {
  module: "platform/roles-permissions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/roles-permissions record ${recordId}`;
  },
};
