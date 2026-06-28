export const leaveCreateWorkflow = {
  module: "hr/leave",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/leave record ${recordId}`;
  },
};
