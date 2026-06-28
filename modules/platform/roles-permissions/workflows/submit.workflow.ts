export const rolesPermissionsSubmitWorkflow = {
  module: "platform/roles-permissions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/roles-permissions record ${recordId}`;
  },
};
