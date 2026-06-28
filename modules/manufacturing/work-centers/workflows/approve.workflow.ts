export const workCentersApproveWorkflow = {
  module: "manufacturing/work-centers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/work-centers record ${recordId}`;
  },
};
