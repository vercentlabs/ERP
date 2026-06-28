export const workCentersUpdateWorkflow = {
  module: "manufacturing/work-centers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/work-centers record ${recordId}`;
  },
};
