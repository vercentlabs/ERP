export const rolesPermissionsCreateWorkflow = {
  module: "platform/roles-permissions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/roles-permissions record ${recordId}`;
  },
};
