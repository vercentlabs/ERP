export const timesheetsCreateWorkflow = {
  module: "projects/timesheets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/timesheets record ${recordId}`;
  },
};
