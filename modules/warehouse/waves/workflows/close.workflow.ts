export const wavesCloseWorkflow = {
  module: "warehouse/waves",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/waves record ${recordId}`;
  },
};
