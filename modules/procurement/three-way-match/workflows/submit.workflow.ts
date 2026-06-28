export const threeWayMatchSubmitWorkflow = {
  module: "procurement/three-way-match",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/three-way-match record ${recordId}`;
  },
};
