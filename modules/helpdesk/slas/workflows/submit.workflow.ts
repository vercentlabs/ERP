export const slasSubmitWorkflow = {
  module: "helpdesk/slas",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/slas record ${recordId}`;
  },
};
