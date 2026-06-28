export const fiscalCalendarsApproveWorkflow = {
  module: "platform/fiscal-calendars",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
