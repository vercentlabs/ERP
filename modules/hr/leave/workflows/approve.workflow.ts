export const leaveApproveWorkflow = {
  module: "hr/leave",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/leave record ${recordId}`;
  },
};
