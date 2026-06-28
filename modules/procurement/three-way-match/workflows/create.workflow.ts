export const threeWayMatchCreateWorkflow = {
  module: "procurement/three-way-match",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/three-way-match record ${recordId}`;
  },
};
