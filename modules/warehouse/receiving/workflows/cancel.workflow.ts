export const receivingCancelWorkflow = {
  module: "warehouse/receiving",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/receiving record ${recordId}`;
  },
};
