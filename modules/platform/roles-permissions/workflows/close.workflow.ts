export const rolesPermissionsCloseWorkflow = {
  module: "platform/roles-permissions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/roles-permissions record ${recordId}`;
  },
};
