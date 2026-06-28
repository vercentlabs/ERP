export const workCentersRejectWorkflow = {
  module: "manufacturing/work-centers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/work-centers record ${recordId}`;
  },
};
