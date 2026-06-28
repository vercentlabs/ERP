export const threeWayMatchCancelWorkflow = {
  module: "procurement/three-way-match",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/three-way-match record ${recordId}`;
  },
};
