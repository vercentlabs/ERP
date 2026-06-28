export const leaveUpdateWorkflow = {
  module: "hr/leave",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/leave record ${recordId}`;
  },
};
