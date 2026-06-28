export const dispatchCancelWorkflow = {
  module: "field-service/dispatch",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/dispatch record ${recordId}`;
  },
};
