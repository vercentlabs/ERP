export const threeWayMatchCloseWorkflow = {
  module: "procurement/three-way-match",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/three-way-match record ${recordId}`;
  },
};
