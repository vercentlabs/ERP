export const threeWayMatchRejectWorkflow = {
  module: "procurement/three-way-match",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/three-way-match record ${recordId}`;
  },
};
