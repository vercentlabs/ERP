export const slasUpdateWorkflow = {
  module: "helpdesk/slas",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/slas record ${recordId}`;
  },
};
