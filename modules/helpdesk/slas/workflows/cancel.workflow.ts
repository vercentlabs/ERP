export const slasCancelWorkflow = {
  module: "helpdesk/slas",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/slas record ${recordId}`;
  },
};
