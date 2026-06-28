export const slasRejectWorkflow = {
  module: "helpdesk/slas",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/slas record ${recordId}`;
  },
};
