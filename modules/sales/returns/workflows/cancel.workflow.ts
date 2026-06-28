export const returnsCancelWorkflow = {
  module: "sales/returns",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/returns record ${recordId}`;
  },
};
