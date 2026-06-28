export const fiscalCalendarsCreateWorkflow = {
  module: "platform/fiscal-calendars",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/fiscal-calendars record ${recordId}`;
  },
};
