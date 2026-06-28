export const companiesCancelWorkflow = {
  module: "platform/companies",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/companies record ${recordId}`;
  },
};
