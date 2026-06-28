export const threeWayMatchUpdateWorkflow = {
  module: "procurement/three-way-match",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/three-way-match record ${recordId}`;
  },
};
