export const returnsRepairsUpdateWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
