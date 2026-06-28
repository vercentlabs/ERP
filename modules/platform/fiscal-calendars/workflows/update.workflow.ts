export const fiscalCalendarsUpdateWorkflow = {
  module: "platform/fiscal-calendars",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
