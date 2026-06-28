export const fiscalCalendarsCloseWorkflow = {
  module: "platform/fiscal-calendars",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
