export const timesheetsUpdateWorkflow = {
  module: "projects/timesheets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/timesheets record ${recordId}`;
  },
};
