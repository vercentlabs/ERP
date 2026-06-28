export const binsCancelWorkflow = {
  module: "warehouse/bins",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/bins record ${recordId}`;
  },
};
