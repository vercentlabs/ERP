export const fiscalCalendarsCancelWorkflow = {
  module: "platform/fiscal-calendars",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
