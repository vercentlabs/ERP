export const rolesPermissionsApproveWorkflow = {
  module: "platform/roles-permissions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/roles-permissions record ${recordId}`;
  },
};
