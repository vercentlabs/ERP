export const returnsRepairsCancelWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
