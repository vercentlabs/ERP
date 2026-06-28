export const mpsApproveWorkflow = {
  module: "manufacturing/mps",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/mps record ${recordId}`;
  },
};
