export const mpsCloseWorkflow = {
  module: "manufacturing/mps",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/mps record ${recordId}`;
  },
};
