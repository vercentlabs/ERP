export const timesheetsCloseWorkflow = {
  module: "projects/timesheets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/timesheets record ${recordId}`;
  },
};
