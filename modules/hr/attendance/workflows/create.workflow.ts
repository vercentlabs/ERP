export const attendanceCreateWorkflow = {
  module: "hr/attendance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/attendance record ${recordId}`;
  },
};
