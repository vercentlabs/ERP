export const wavesCancelWorkflow = {
  module: "warehouse/waves",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/waves record ${recordId}`;
  },
};
