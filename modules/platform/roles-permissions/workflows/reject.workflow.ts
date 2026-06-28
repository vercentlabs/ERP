export const rolesPermissionsRejectWorkflow = {
  module: "platform/roles-permissions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/roles-permissions record ${recordId}`;
  },
};
