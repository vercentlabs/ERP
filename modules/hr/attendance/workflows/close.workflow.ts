export const attendanceCloseWorkflow = {
  module: "hr/attendance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/attendance record ${recordId}`;
  },
};
