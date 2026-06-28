export const leaveRejectWorkflow = {
  module: "hr/leave",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/leave record ${recordId}`;
  },
};
