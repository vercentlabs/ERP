export const attendanceUpdateWorkflow = {
  module: "hr/attendance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/attendance record ${recordId}`;
  },
};
