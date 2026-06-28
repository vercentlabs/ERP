export const threeWayMatchApproveWorkflow = {
  module: "procurement/three-way-match",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/three-way-match record ${recordId}`;
  },
};
