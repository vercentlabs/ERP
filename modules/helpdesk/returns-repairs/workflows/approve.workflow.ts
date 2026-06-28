export const returnsRepairsApproveWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
