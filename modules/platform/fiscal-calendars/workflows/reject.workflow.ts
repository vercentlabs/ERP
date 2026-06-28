export const fiscalCalendarsRejectWorkflow = {
  module: "platform/fiscal-calendars",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
