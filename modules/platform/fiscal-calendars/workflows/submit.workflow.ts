export const fiscalCalendarsSubmitWorkflow = {
  module: "platform/fiscal-calendars",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
