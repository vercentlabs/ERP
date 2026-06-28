export const returnsRepairsSubmitWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
