export const leaveCloseWorkflow = {
  module: "hr/leave",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/leave record ${recordId}`;
  },
};
