export const slasCloseWorkflow = {
  module: "helpdesk/slas",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/slas record ${recordId}`;
  },
};
