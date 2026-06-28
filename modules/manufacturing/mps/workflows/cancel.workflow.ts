export const mpsCancelWorkflow = {
  module: "manufacturing/mps",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/mps record ${recordId}`;
  },
};
