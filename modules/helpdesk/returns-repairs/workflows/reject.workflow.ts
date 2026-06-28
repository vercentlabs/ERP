export const returnsRepairsRejectWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
