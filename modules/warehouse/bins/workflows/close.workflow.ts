export const binsCloseWorkflow = {
  module: "warehouse/bins",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/bins record ${recordId}`;
  },
};
