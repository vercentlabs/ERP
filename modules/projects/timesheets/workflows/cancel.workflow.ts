export const timesheetsCancelWorkflow = {
  module: "projects/timesheets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/timesheets record ${recordId}`;
  },
};
