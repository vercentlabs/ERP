export const slasCreateWorkflow = {
  module: "helpdesk/slas",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/slas record ${recordId}`;
  },
};
